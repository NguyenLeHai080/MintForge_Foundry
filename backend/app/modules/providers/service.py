from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import random
from app.modules.providers.models import Provider, FailoverSetting
from app.modules.providers.schemas import ProviderCreate, ProviderUpdate, FailoverConfigSchema, PingResult
from app.core.exceptions import NotFoundException

class ProviderService:
    @staticmethod
    async def seed_initial_data_if_empty(db: AsyncSession):
        result = await db.execute(select(Provider))
        existing = result.scalars().first()
        if not existing:
            p1 = Provider(
                name="Nhà Cung cấp 02",
                slug="nha_cung_cap_02",
                base_url="https://api.1eeh.dev/v1",
                api_key="sk-50Z82910488219482910",
                default_model="gpt-image-2",
                supported_models="gpt-image-2",
                cost_per_image=120,
                latency_ms=119362,
                is_primary=True,
                is_active=True
            )
            p2 = Provider(
                name="Nhà Cung Cấp 01",
                slug="nha_cung_cap_01",
                base_url="https://api.xompet.io.vn/v1",
                api_key="sk-9r88291048821948Lnzz",
                default_model="gpt-image-2.5-flare",
                supported_models="gpt-image-2.5-flare,gpt-image-2.5-sunburst,gpt-image-2,nanobanana-2",
                cost_per_image=75,
                latency_ms=271,
                is_primary=False,
                is_active=False
            )
            db.add_all([p1, p2])
            
            failover = FailoverSetting(
                is_enabled=True,
                timeout_seconds=45
            )
            db.add(failover)
            await db.commit()

    @staticmethod
    async def get_all(db: AsyncSession):
        await ProviderService.seed_initial_data_if_empty(db)
        result = await db.execute(select(Provider).order_by(Provider.is_primary.desc(), Provider.created_at.desc()))
        return result.scalars().all()

    @staticmethod
    async def create(db: AsyncSession, data_in: ProviderCreate):
        if data_in.is_primary:
            # Unset all other primaries
            result = await db.execute(select(Provider).where(Provider.is_primary == True))
            for p in result.scalars().all():
                p.is_primary = False

        provider = Provider(**data_in.model_dump())
        db.add(provider)
        await db.commit()
        await db.refresh(provider)
        return provider

    @staticmethod
    async def update(db: AsyncSession, provider_id: str, data_in: ProviderUpdate):
        result = await db.execute(select(Provider).where(Provider.id == provider_id))
        provider = result.scalars().first()
        if not provider:
            raise NotFoundException("Nhà cung cấp", provider_id)

        if data_in.is_primary:
            all_primaries = await db.execute(select(Provider).where(Provider.is_primary == True))
            for p in all_primaries.scalars().all():
                p.is_primary = False

        for field, val in data_in.model_dump(exclude_unset=True).items():
            setattr(provider, field, val)

        await db.commit()
        await db.refresh(provider)
        return provider

    @staticmethod
    async def delete(db: AsyncSession, provider_id: str):
        result = await db.execute(select(Provider).where(Provider.id == provider_id))
        provider = result.scalars().first()
        if not provider:
            raise NotFoundException("Nhà cung cấp", provider_id)
        await db.delete(provider)
        await db.commit()
        return True

    @staticmethod
    async def set_primary(db: AsyncSession, provider_id: str):
        result = await db.execute(select(Provider))
        all_providers = result.scalars().all()
        target = None
        for p in all_providers:
            if p.id == provider_id:
                p.is_primary = True
                p.is_active = True
                target = p
            else:
                p.is_primary = False

        if not target:
            raise NotFoundException("Nhà cung cấp", provider_id)
        await db.commit()
        await db.refresh(target)
        return target

    @staticmethod
    async def ping_provider(db: AsyncSession, provider_id: str):
        result = await db.execute(select(Provider).where(Provider.id == provider_id))
        provider = result.scalars().first()
        if not provider:
            raise NotFoundException("Nhà cung cấp", provider_id)
        
        # Mô phỏng test kết nối realtime
        new_latency = random.randint(180, 450) if provider.is_active else 0
        provider.latency_ms = new_latency
        await db.commit()
        await db.refresh(provider)
        return PingResult(
            provider_id=provider.id,
            latency_ms=provider.latency_ms,
            status="ONLINE" if provider.is_active else "OFFLINE"
        )

    @staticmethod
    async def get_failover(db: AsyncSession):
        result = await db.execute(select(FailoverSetting))
        config = result.scalars().first()
        if not config:
            config = FailoverSetting(is_enabled=True, timeout_seconds=45)
            db.add(config)
            await db.commit()
            await db.refresh(config)
        return config

    @staticmethod
    async def update_failover(db: AsyncSession, config_in: FailoverConfigSchema):
        config = await ProviderService.get_failover(db)
        config.is_enabled = config_in.is_enabled
        config.timeout_seconds = config_in.timeout_seconds
        await db.commit()
        await db.refresh(config)
        return config
