from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    app_env: str = "local"
    database_url: str = "sqlite:///./data/app.db"
    backend_host: str = "0.0.0.0"
    backend_port: int = 8000
    frontend_port: int = 5173
    vite_api_base_url: str = "http://localhost:8000"
    otel_service_name: str = "ejer-spec-backend"
    otel_traces_exporter: str = "none"

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


def get_database_url() -> str:
    database_url = get_settings().database_url
    sqlite_prefix = "sqlite:///"
    if not database_url.startswith(sqlite_prefix):
        return database_url

    database_path = database_url.removeprefix(sqlite_prefix)
    if not database_path or database_path == ":memory:":
        return database_url

    path = Path(database_path)
    if path.is_absolute():
        return database_url

    return f"{sqlite_prefix}{(BACKEND_ROOT / path).as_posix()}"
