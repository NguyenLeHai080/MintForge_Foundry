from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.auth.models import User
from app.modules.auth.schemas import UserCreate
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.exceptions import AppException, UnauthorizedException

class AuthService:
    @staticmethod
    async def get_by_email(db: AsyncSession, email: str):
        result = await db.execute(select(User).where(User.email == email))
        return result.scalars().first()

    @staticmethod
    async def create_user(db: AsyncSession, user_in: UserCreate):
        existing = await AuthService.get_by_email(db, user_in.email)
        if existing:
            raise AppException(status_code=400, error_code="EMAIL_EXISTS", message="Email này đã được sử dụng")
        
        user = User(
            email=user_in.email,
            name=user_in.name,
            hashed_password=get_password_hash(user_in.password),
            role=user_in.role or "USER"
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user

    @staticmethod
    async def authenticate(db: AsyncSession, email: str, password: str):
        user = await AuthService.get_by_email(db, email)
        if not user or not verify_password(password, user.hashed_password):
            raise UnauthorizedException("Email hoặc mật khẩu không chính xác")
        if not user.is_active:
            raise UnauthorizedException("Tài khoản đã bị tạm khóa")
        
        token = create_access_token(subject=user.id)
        return token, user
