from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "MintForge Foundry Billing & Credits Engine"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super-secret-key-mintforge-foundry-dev-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "*"]
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./mintforge.db"

    class Config:
        case_sensitive = True

settings = Settings()
