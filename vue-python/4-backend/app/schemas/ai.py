from pydantic import BaseModel, Field


class ProcurementFields(BaseModel):
    """LLM 返回的候选字段；所有值都必须由用户进一步确认。"""

    material: str | None = None
    specification: str | None = None
    quantity: int | None = Field(default=None, ge=1)
    unit: str | None = None
    expectedDeliveryDate: str | None = None
    purpose: str | None = None
    preferredBrand: str | None = None
    preferredSupplier: str | None = None


class AIExtractionRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4_000)
    clientRequestId: str = Field(min_length=1, max_length=128)
    expectedVersion: int = Field(ge=0)


class AIExtractionResponse(BaseModel):
    jobId: str
    status: str = "SUCCEEDED"
    fields: ProcurementFields
    missingFields: list[str] = Field(default_factory=list)
    ambiguities: list[str] = Field(default_factory=list)
