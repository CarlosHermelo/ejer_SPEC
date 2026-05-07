from fastapi import FastAPI

from app.core.config import get_settings
from app.observability.setup import configure_observability

settings = get_settings()

app = FastAPI(title="Gestion de personas", version="0.1.0")
configure_observability(app)


@app.get("/health", tags=["system"])
def health_check() -> dict[str, str]:
    return {"status": "ok", "environment": settings.app_env}
