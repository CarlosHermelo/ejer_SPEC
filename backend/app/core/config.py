from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "local"
    backend_host: str = "0.0.0.0"
    backend_port: int = 8000
    frontend_port: int = 5173
    otel_service_name: str = "ejer-spec-backend"
    otel_traces_exporter: str = "none"
    supabase_url: str
    supabase_key: str
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
