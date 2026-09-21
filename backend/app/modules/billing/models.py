from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey
from datetime import datetime
import uuid
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class Plan(Base):
    __tablename__ = "plans"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    price_vnd = Column(Integer, nullable=False)
    credits_granted = Column(Integer, nullable=False)
    category = Column(String(50), default="MONTHLY")  # MONTHLY, YEARLY, TOPUP
    status = Column(String(20), default="ACTIVE")    # ACTIVE, INACTIVE
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    plan_id = Column(String(36), ForeignKey("plans.id"), nullable=False)
    amount_vnd = Column(Integer, nullable=False)
    payment_method = Column(String(50), default="vietqr")
    status = Column(String(20), default="PENDING")  # PENDING, COMPLETED, FAILED, REFUNDED
    created_at = Column(DateTime, default=datetime.utcnow)
