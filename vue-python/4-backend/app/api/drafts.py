from typing import Literal
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rbac import require_permission
from app.models.draft import Draft
from app.models.user import User
from app.schemas.draft import DraftCreateRequest, DraftListResponse, DraftResponse, DraftUpdateRequest

router = APIRouter(prefix="/drafts", tags=["采购草稿"])


def to_response(draft: Draft) -> DraftResponse:
    return DraftResponse(
        id=draft.id,
        status=draft.status,
        version=draft.version,
        rawText=draft.raw_text,
        fields=draft.field_values,
        updatedAt=draft.updated_at,
    )


@router.get("", response_model=dict)
def list_drafts(
    draft_status: Literal["DRAFT", "SUBMITTED"] | None = Query(default=None, alias="status"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100, alias="pageSize"),
    user: User = Depends(require_permission("draft", "read")),
    db: Session = Depends(get_db),
):
    """仅返回当前采购专员自己的草稿/已提交记录，不跨用户泄露数据。"""
    filters = [Draft.owner_id == user.id]
    if draft_status is not None:
        filters.append(Draft.status == draft_status)
    total = db.scalar(select(func.count()).select_from(Draft).where(*filters)) or 0
    drafts = db.scalars(
        select(Draft)
        .where(*filters)
        .order_by(Draft.updated_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    ).all()
    result = DraftListResponse(
        items=[to_response(item) for item in drafts], total=total, page=page, pageSize=page_size
    )
    return {"data": result.model_dump(mode="json")}


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_draft(
    body: DraftCreateRequest,
    user: User = Depends(require_permission("draft", "write")),
    db: Session = Depends(get_db),
):
    draft = Draft(owner_id=user.id, raw_text=body.rawText, field_values=body.fields.model_dump())
    db.add(draft)
    db.commit()
    db.refresh(draft)
    return {"data": to_response(draft).model_dump(mode="json")}


@router.patch("/{draft_id}", response_model=dict)
def update_draft(
    draft_id: str,
    body: DraftUpdateRequest,
    user: User = Depends(require_permission("draft", "write")),
    db: Session = Depends(get_db),
):
    draft = db.get(Draft, draft_id)
    if draft is None or draft.owner_id != user.id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "未找到该采购草稿")
    if draft.version != body.expectedVersion:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail={"code": "DRAFT_VERSION_CONFLICT", "message": "草稿已被更新，请刷新后重试。"},
        )
    draft.raw_text = body.rawText
    draft.field_values = body.fields.model_dump()
    draft.version += 1
    db.commit()
    db.refresh(draft)
    return {"data": to_response(draft).model_dump(mode="json")}
