from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PlanBase(BaseModel):
    name: str
    price_vnd: int
    credits_granted: int
    category: Optional[str] = "MONTHLY"
    status: Optional[str] = "ACTIVE"

class PlanCreate(PlanBase):
    pass

class PlanUpdate(BaseModel):
    name: Optional[str] = None
    price_vnd: Optional[int] = None
    credits_granted: Optional[int] = None
    category: Optional[str] = None
    status: Optional[str] = None

class PlanResponse(PlanBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

class CheckoutRequest(BaseModel):
    plan_id: str
    payment_method: str = "vietqr"

class CheckoutResponse(BaseModel):
    order_id: str
    amount_vnd: int
    qr_code_url: str
    transfer_content: str
