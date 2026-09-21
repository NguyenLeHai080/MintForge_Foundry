from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.modules.billing.schemas import PlanCreate, PlanUpdate, PlanResponse
from app.modules.billing.service import BillingService
from app.shared.responses import ApiResponse
from app.core.permissions import require_role
from app.modules.auth.models import User

router = APIRouter(prefix="/admin", tags=["Admin Portal Management"])

@router.post("/plans", response_model=ApiResponse[PlanResponse])
async def create_plan(
    plan_in: PlanCreate,
    admin_user: User = Depends(require_role("ADMIN")),
    db: AsyncSession = Depends(get_db)
):
    """Admin tạo gói cước mới"""
    plan = await BillingService.create_plan(db, plan_in)
    return ApiResponse(message="Tạo gói cước thành công", data=plan)

@router.put("/plans/{plan_id}", response_model=ApiResponse[PlanResponse])
async def update_plan(
    plan_id: str,
    plan_in: PlanUpdate,
    admin_user: User = Depends(require_role("ADMIN")),
    db: AsyncSession = Depends(get_db)
):
    """Admin cập nhật thông tin gói cước"""
    plan = await BillingService.update_plan(db, plan_id, plan_in)
    return ApiResponse(message="Cập nhật gói cước thành công", data=plan)

@router.delete("/plans/{plan_id}", response_model=ApiResponse[bool])
async def delete_plan(
    plan_id: str,
    admin_user: User = Depends(require_role("ADMIN")),
    db: AsyncSession = Depends(get_db)
):
    """Admin xóa gói cước"""
    await BillingService.delete_plan(db, plan_id)
    return ApiResponse(message="Đã xóa gói cước thành công", data=True)
