import json
from datetime import date
from openai import AsyncOpenAI
from app.core.config import get_settings
from app.schemas.ai import ProcurementFields


class AIConfigurationError(RuntimeError):
    pass


SYSTEM_PROMPT = """你是制造企业采购需求助手。你的唯一工作是从采购人员的自然语言中提取“候选”采购申请字段。

## 规则
1. 仅提取用户明确提供，或可由原文直接且无歧义推导的信息；不要编造物料编码、供应商、品牌、规格、数量、用途或日期。
2. 不确定、缺失、有歧义，或“上次采购/原来的品牌”等需查询历史事实的内容，对应字段必须输出 null；不得把推测当成事实。
3. `expectedDeliveryDate` 仅在原文包含无歧义的具体日期时输出 `YYYY-MM-DD`；相对日期、模糊日期或无法判断年份时输出 null，并在 `ambiguities` 说明原因。
4. `quantity` 必须是正整数；无法确定时输出 null。单位必须保留原文含义，无法确定时输出 null。
5. `missingFields` 只可从 material、specification、quantity、unit、expectedDeliveryDate、purpose、preferredBrand、preferredSupplier 中选取；`ambiguities` 是简短中文说明数组。
6. 返回值只是待确认候选，不能声称已选择、已确认或已创建正式采购申请。

## 输出格式
只输出合法 JSON，不使用 Markdown 或额外文本，严格使用以下完整结构：
{
  "material": "string 或 null",
  "specification": "string 或 null",
  "quantity": "integer 或 null",
  "unit": "string 或 null",
  "expectedDeliveryDate": "YYYY-MM-DD 或 null",
  "purpose": "string 或 null",
  "preferredBrand": "string 或 null",
  "preferredSupplier": "string 或 null",
  "missingFields": ["字段名"],
  "ambiguities": ["需要用户确认的中文说明"]
}
"""


async def extract_procurement_fields(raw_text: str) -> tuple[ProcurementFields, list[str], list[str]]:
    """调用 GLM 并将不可信的 LLM 输出收敛为页面所需的候选字段。"""
    settings = get_settings()
    if not settings.zhipuai_api_key:
        raise AIConfigurationError("AI_NOT_CONFIGURED: 请设置 ZHIPUAI_API_KEY")
    client = AsyncOpenAI(api_key=settings.zhipuai_api_key, base_url=settings.zhipuai_base_url)
    response = await client.chat.completions.create(
        model=settings.zhipuai_model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"今天是 {date.today().isoformat()}。采购人员原始输入：\n{raw_text}"},
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )
    content = response.choices[0].message.content
    if not content:
        raise ValueError("AI_EMPTY_RESPONSE")
    payload = json.loads(content)
    fields = ProcurementFields.model_validate(payload)
    allowed_field_names = set(ProcurementFields.model_fields)
    missing_fields = [item for item in payload.get("missingFields", []) if item in allowed_field_names]
    ambiguities = [str(item) for item in payload.get("ambiguities", [])][:10]
    return fields, missing_fields, ambiguities
