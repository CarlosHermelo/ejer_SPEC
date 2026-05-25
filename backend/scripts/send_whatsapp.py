import os
import sys
import requests


def main():
    if len(sys.argv) < 2 or not sys.argv[1].strip():
        print("Error: debés pasar el texto del mensaje como argumento.", file=sys.stderr)
        print("Uso: python send_whatsapp.py \"tu mensaje\"", file=sys.stderr)
        sys.exit(1)

    api_key = os.environ.get("KAPSO_API_KEY")
    phone_number_id = os.environ.get("PHONE_NUMBER_ID")
    numero_destino = os.environ.get("NUMERO_DESTINO")

    missing = [v for v, k in [("KAPSO_API_KEY", api_key), ("PHONE_NUMBER_ID", phone_number_id), ("NUMERO_DESTINO", numero_destino)] if k is None]
    if missing:
        print(f"Error: variables de entorno faltantes: {', '.join(missing)}", file=sys.stderr)
        sys.exit(1)

    texto = sys.argv[1].strip()
    url = f"https://app.kapso.ai/api/meta/v1/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": numero_destino,
        "type": "text",
        "text": {"body": texto},
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        print(f"Mensaje enviado: \"{texto}\"")
    except requests.HTTPError as e:
        print(f"Error HTTP {response.status_code}: {response.text}", file=sys.stderr)
        sys.exit(1)
    except requests.RequestException as e:
        print(f"Error de conexión: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
