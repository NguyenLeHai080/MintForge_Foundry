from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.modules.auth.schemas import UserCreate, UserLogin, TokenResponse, UserResponse
from app.modules.auth.service import AuthService
from app.shared.responses import ApiResponse
from app.core.permissions import get_current_user
from app.modules.auth.models import User

router = APIRouter(prefix="/auth", tags=["Authentication & RBAC"])

@router.post("/register", response_model=ApiResponse[UserResponse])
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    user = await AuthService.create_user(db, user_in)
    return ApiResponse(message="Đăng ký tài khoản thành công", data=user)

@router.post("/login", response_model=ApiResponse[TokenResponse])
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    token, user = await AuthService.authenticate(db, credentials.email, credentials.password)
    return ApiResponse(
        message="Đăng nhập thành công",
        data=TokenResponse(access_token=token, user=user)
    )

@router.get("/me", response_model=ApiResponse[UserResponse])
async def get_me(current_user: User = Depends(get_current_user)):
    return ApiResponse(data=current_user)

@router.post("/logout", response_model=ApiResponse[dict])
async def logout():
    return ApiResponse(message="Đăng xuất thành công", data={"logged_out": True})
