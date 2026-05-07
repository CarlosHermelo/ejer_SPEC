from fastapi import FastAPI
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

from app.core.config import get_settings


def configure_observability(app: FastAPI) -> None:
    settings = get_settings()
    app.state.otel_service_name = settings.otel_service_name
    FastAPIInstrumentor.instrument_app(app)
