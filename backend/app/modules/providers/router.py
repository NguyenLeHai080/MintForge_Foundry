from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.modules.providers.schemas import (
    ProviderCreate, ProviderUpdate, ProviderResponse,
    FailoverConfigSchema, PingResult
)
from app.modules.providers.service import ProviderService
from app.shared.responses import ApiResponse

router = APIRouter(prefix="/providers", tags=["AI Upstream Providers Management"])

@router.get("", response_model=ApiResponse[List[ProviderResponse]])
async def list_providers(db: AsyncSession = Depends(get_db)):
    providers = await ProviderService.get_all(db)
    return ApiResponse(data=providers)

@router.post("", response_model=ApiResponse[ProviderResponse])
async def create_provider(data_in: ProviderCreate, db: AsyncSession = Depends(get_db)):
    provider = await ProviderService.create(db, data_in)
    return ApiResponse(message="Thêm nhà cung cấp thành công", data=provider)

@router.put("/{provider_id}", response_model=ApiResponse[ProviderResponse])
async def update_provider(provider_id: str, data_in: ProviderUpdate, db: AsyncSession = Depends(get_db)):
    provider = await ProviderService.update(db, provider_id, data_in)
    return ApiResponse(message="Cập nhật nhà cung cấp thành công", data=provider)

@router.delete("/{provider_id}", response_model=ApiResponse[bool])
async def delete_provider(provider_id: str, db: AsyncSession = Depends(get_db)):
    await ProviderService.delete(db, provider_id)
    return ApiResponse(message="Đã xóa nhà cung cấp thành công", data=True)

@router.post("/{provider_id}/set-primary", response_model=ApiResponse[ProviderResponse])
async def set_primary_provider(provider_id: str, db: AsyncSession = Depends(get_db)):
    provider = await ProviderService.set_primary(db, provider_id)
    return ApiResponse(message=f"Đã chuyển '{provider.name}' thành Cổng chính", data=provider)

@router.post("/{provider_id}/ping", response_model=ApiResponse[PingResult])
async def ping_provider(provider_id: str, db: AsyncSession = Depends(get_db)):
    result = await ProviderService.ping_provider(db, provider_id)
    return ApiResponse(message="Kiểm tra kết nối thành công", data=result)

@router.get("/failover/config", response_model=ApiResponse[FailoverConfigSchema])
async def get_failover_config(db: AsyncSession = Depends(get_db)):
    config = await ProviderService.get_failover(db)
    return ApiResponse(data=FailoverConfigSchema(
        is_enabled=config.is_enabled,
        timeout_seconds=config.timeout_seconds
    ))

@router.put("/failover/config", response_model=ApiResponse[FailoverConfigSchema])
async def update_failover_config(data_in: FailoverConfigSchema, db: AsyncSession = Depends(get_db)):
    config = await ProviderService.update_failover(db, data_in)
    return ApiResponse(message="Cập nhật cơ chế chuyển mạch thành công", data=FailoverConfigSchema(
        is_enabled=config.is_enabled,
        timeout_seconds=config.timeout_seconds
    ))
