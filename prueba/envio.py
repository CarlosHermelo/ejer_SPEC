"""
Enviar mensaje de WhatsApp via Kapso.
Uso: python envio.py "Tu mensaje aqui"
Requiere en .env: KAPSO_API_KEY, PHONE_NUMBER_ID, NUMERO_DESTINO
"""
import os
import sys

import requests
from dotenv import load_dotenv

load_dotenv()


def enviar_mensaje(texto: str) -> None:
    api_key = os.environ.get("KAPSO_API_KEY")
    phone_number_id = os.environ.get("PHONE_NUMBER_ID")
    numero_destino = os.environ.get("NUMERO_DESTINO")

    missing = [name for name, val in [
        ("KAPSO_API_KEY", api_key),
        ("PHONE_NUMBER_ID", phone_number_id),
        ("NUMERO_DESTINO", numero_destino),
    ] if val is None]
    if missing:
        print(f"Error: variables de entorno faltantes: {', '.join(missing)}", file=sys.stderr)
        sys.exit(1)

    url = f"https://api.kapso.ai/meta/whatsapp/v24.0/{phone_number_id}/messages"
    headers = {"Content-Type": "application/json", "X-API-Key": api_key}
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": numero_destino,
        "type": "text",
        "text": {"body": texto},
    }

    response = requests.post(url, json=payload, headers=headers, timeout=10)
    if response.status_code == 200:
        print(f"Mensaje enviado: {texto}")
    else:
        print(f"Error {response.status_code}: {response.text}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('Uso: python envio.py "Tu mensaje"')
        sys.exit(1)
    enviar_mensaje(" ".join(sys.argv[1:]))
