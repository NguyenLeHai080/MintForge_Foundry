from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.modules.billing.schemas import PlanResponse, CheckoutRequest, CheckoutResponse
from app.modules.billing.service import BillingService
from app.shared.responses import ApiResponse
from app.core.permissions import get_current_user
from app.modules.auth.models import User

router = APIRouter(prefix="/billing", tags=["Billing & Checkout"])

@router.get("/plans", response_model=ApiResponse[List[PlanResponse]])
async def list_plans(db: AsyncSession = Depends(get_db)):
    """Lấy danh sách bảng giá công khai (Không cần đăng nhập)"""
    plans = await BillingService.get_active_plans(db)
    return ApiResponse(data=plans)

@router.post("/checkout", response_model=ApiResponse[CheckoutResponse])
async def create_checkout(
    checkout_in: CheckoutRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Tạo đơn thanh toán nạp gói (Yêu cầu đăng nhập)"""
    checkout_data = await BillingService.checkout(db, current_user.id, checkout_in)
    return ApiResponse(message="Khởi tạo đơn hàng thành công", data=checkout_data)
