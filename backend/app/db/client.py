from supabase import Client, create_client

from app.core.config import get_settings


def _create_supabase_client() -> Client:
    settings = get_settings()
    return create_client(settings.supabase_url, settings.supabase_key)


_client: Client | None = None


def get_supabase() -> Client:
    global _client
    if _client is None:
        _client = _create_supabase_client()
    return _client
