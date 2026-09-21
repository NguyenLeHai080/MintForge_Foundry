from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProviderBase(BaseModel):
    name: str
    slug: str
    base_url: str
    api_key: str
    default_model: Optional[str] = "gpt-image-2"
    supported_models: Optional[str] = "gpt-image-2"
    cost_per_image: Optional[int] = 120
    is_primary: Optional[bool] = False
    is_active: Optional[bool] = True

class ProviderCreate(ProviderBase):
    pass

class ProviderUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    base_url: Optional[str] = None
    api_key: Optional[str] = None
    default_model: Optional[str] = None
    supported_models: Optional[str] = None
    cost_per_image: Optional[int] = None
    is_primary: Optional[bool] = None
    is_active: Optional[bool] = None

class ProviderResponse(ProviderBase):
    id: str
    latency_ms: int
    created_at: datetime

    class Config:
        from_attributes = True

class FailoverConfigSchema(BaseModel):
    is_enabled: bool
    timeout_seconds: int

class PingResult(BaseModel):
    provider_id: str
    latency_ms: int
    status: str
