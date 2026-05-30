from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.personas import router as personas_router
from app.api.whatsapp import router as whatsapp_router
from app.core.config import get_settings
from app.observability.setup import configure_observability

settings = get_settings()

app = FastAPI(title="Gestion de personas", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

configure_observability(app)
app.include_router(personas_router)
app.include_router(whatsapp_router)


@app.get("/health", tags=["system"])
def health_check() -> dict[str, str]:
    return {"status": "ok", "environment": settings.app_env}
