from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.exceptions import AppException, app_exception_handler
from app.db.session import engine, Base
from app.modules.auth.router import router as auth_router
from app.modules.billing.router import router as billing_router
from app.modules.admin.router import router as admin_router
from app.modules.providers.router import router as providers_router
from app.modules.providers.models import Provider, FailoverSetting

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Khởi tạo database tables khi khởi động
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Tự động seed tài khoản quản trị & người dùng mẫu nếu chưa có
    from app.db.session import AsyncSessionLocal
    from app.modules.auth.models import User
    from app.core.security import get_password_hash
    from sqlalchemy.future import select

    async with AsyncSessionLocal() as session:
        try:
            admin_res = await session.execute(select(User).where(User.email == "hai@mintforge.io"))
            if not admin_res.scalars().first():
                session.add(User(
                    email="hai@mintforge.io",
                    name="Nguyen Le Hai",
                    hashed_password=get_password_hash("admin123"),
                    role="ADMIN",
                    is_active=True
                ))

            creator_res = await session.execute(select(User).where(User.email == "creator@mintforge.io"))
            if not creator_res.scalars().first():
                session.add(User(
                    email="creator@mintforge.io",
                    name="AI Creator Pro",
                    hashed_password=get_password_hash("creator123"),
                    role="CREATOR",
                    is_active=True
                ))
            await session.commit()
        except Exception as e:
            await session.rollback()
            print(f"[Seed] Info: {e}")

    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Exception handlers
app.add_exception_handler(AppException, app_exception_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register modular routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(billing_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)
app.include_router(providers_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "service": settings.PROJECT_NAME,
        "status": "online",
        "docs_url": "/docs"
    }
