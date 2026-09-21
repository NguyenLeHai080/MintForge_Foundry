from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.billing.models import Plan, Order
from app.modules.billing.schemas import PlanCreate, PlanUpdate, CheckoutRequest, CheckoutResponse
from app.core.exceptions import NotFoundException

class BillingService:
    @staticmethod
    async def get_active_plans(db: AsyncSession):
        result = await db.execute(select(Plan).where(Plan.status == "ACTIVE"))
        return result.scalars().all()

    @staticmethod
    async def create_plan(db: AsyncSession, plan_in: PlanCreate):
        plan = Plan(**plan_in.model_dump())
        db.add(plan)
        await db.commit()
        await db.refresh(plan)
        return plan

    @staticmethod
    async def update_plan(db: AsyncSession, plan_id: str, plan_in: PlanUpdate):
        result = await db.execute(select(Plan).where(Plan.id == plan_id))
        plan = result.scalars().first()
        if not plan:
            raise NotFoundException("Gói cước", plan_id)
        
        for field, value in plan_in.model_dump(exclude_unset=True).items():
            setattr(plan, field, value)
            
        await db.commit()
        await db.refresh(plan)
        return plan

    @staticmethod
    async def delete_plan(db: AsyncSession, plan_id: str):
        result = await db.execute(select(Plan).where(Plan.id == plan_id))
        plan = result.scalars().first()
        if not plan:
            raise NotFoundException("Gói cước", plan_id)
        await db.delete(plan)
        await db.commit()
        return True

    @staticmethod
    async def checkout(db: AsyncSession, user_id: str, checkout_in: CheckoutRequest) -> CheckoutResponse:
        result = await db.execute(select(Plan).where(Plan.id == checkout_in.plan_id))
        plan = result.scalars().first()
        if not plan:
            raise NotFoundException("Gói cước", checkout_in.plan_id)

        order = Order(
            user_id=user_id,
            plan_id=plan.id,
            amount_vnd=plan.price_vnd,
            payment_method=checkout_in.payment_method,
            status="PENDING"
        )
        db.add(order)
        await db.commit()
        await db.refresh(order)

        transfer_code = f"MF{order.id[:6].upper()}"
        qr_url = f"https://qr.sepay.vn/img?acc=MINTFORGE&bank=MBBank&amount={plan.price_vnd}&des={transfer_code}"

        return CheckoutResponse(
            order_id=order.id,
            amount_vnd=plan.price_vnd,
            qr_code_url=qr_url,
            transfer_content=transfer_code
        )
