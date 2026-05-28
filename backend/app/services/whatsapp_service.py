import requests
from fastapi import HTTPException

from app.core.config import get_settings


def send_message(text: str) -> dict:
    settings = get_settings()
    url = f"https://api.kapso.ai/meta/whatsapp/v24.0/{settings.phone_number_id}/messages"
    headers = {
        "X-API-Key": settings.kapso_api_key,
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": settings.numero_destino,
        "type": "text",
        "text": {"body": text},
    }
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
    except requests.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Kapso error: {e.response.status_code} {e.response.text}")
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error de conexión con Kapso: {str(e)}")
    return {"status": "ok"}
