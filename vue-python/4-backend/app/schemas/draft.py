from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.ai import ProcurementFields


class DraftCreateRequest(BaseModel):
    rawText: str = Field(default="", max_length=4_000)
    fields: ProcurementFields = Field(default_factory=ProcurementFields)


class DraftUpdateRequest(BaseModel):
    rawText: str = Field(default="", max_length=4_000)
    fields: ProcurementFields = Field(default_factory=ProcurementFields)
    expectedVersion: int = Field(ge=1)


class DraftResponse(BaseModel):
    id: str
    status: str
    version: int
    rawText: str
    fields: ProcurementFields
    updatedAt: datetime


class DraftListResponse(BaseModel):
    items: list[DraftResponse]
    total: int
    page: int
    pageSize: int
