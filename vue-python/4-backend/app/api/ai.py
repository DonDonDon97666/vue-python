from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.rbac import require_permission
from app.models.user import User
from app.schemas.ai import AIExtractionRequest, AIExtractionResponse
from app.services.ai import AIConfigurationError, extract_procurement_fields

router = APIRouter(prefix="/drafts", tags=["AI 辅助"])

import logging

logger = logging.getLogger(__name__)


@router.post("/{draft_id}/ai-extractions", response_model=dict)
async def create_ai_extraction(
    draft_id: str,
    body: AIExtractionRequest,
    _: User = Depends(require_permission("draft", "write")),
):
    """按接口文档返回当前草稿的 AI 候选字段；正式草稿持久化将在草稿模块接入。"""
    try:
        fields, missing_fields, ambiguities = await extract_procurement_fields(body.message)
    except AIConfigurationError as exc:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, detail={"code": "AI_NOT_CONFIGURED", "message": str(exc)}) from exc
    # except Exception as exc:
    #     # 不将第三方模型细节暴露给浏览器，原始输入由前端保留，可供用户重试。
    #     raise HTTPException(status.HTTP_502_BAD_GATEWAY, detail={"code": "AI_REQUEST_FAILED", "message": "AI 识别失败，请稍后重试或手工补充。"}) from exc
    except Exception as exc:
        logger.exception(
            "GLM 调用失败，draftId=%s，clientRequestId=%s",
            draft_id,
            body.clientRequestId,
        )
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            detail={
                "code": "AI_REQUEST_FAILED",
                "message": "AI 识别失败，请稍后重试或手工补充。",
            },
        ) from exc

    result = AIExtractionResponse(
        jobId=f"ai_{uuid4().hex}", fields=fields, missingFields=missing_fields, ambiguities=ambiguities
    )
    return {"data": result.model_dump()}
