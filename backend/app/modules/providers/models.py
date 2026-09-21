from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text
from datetime import datetime
import uuid
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class Provider(Base):
    __tablename__ = "upstream_providers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    base_url = Column(String(255), nullable=False)
    api_key = Column(String(255), nullable=False)
    default_model = Column(String(100), default="gpt-image-2")
    supported_models = Column(Text, default="gpt-image-2")  # comma-separated
    cost_per_image = Column(Integer, default=120)  # Đơn vị: VNĐ
    latency_ms = Column(Integer, default=250)
    is_primary = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class FailoverSetting(Base):
    __tablename__ = "failover_settings"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    is_enabled = Column(Boolean, default=True)
    timeout_seconds = Column(Integer, default=45)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
