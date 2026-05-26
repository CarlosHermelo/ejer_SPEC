"""
Enviar mensaje de WhatsApp via Kapso
Uso: python enviar_ws.py "Tu mensaje aquí"
"""
import requests
import sys

# --- CONFIGURACION ---
KAPSO_API_KEY = "24b4150f105ad350c2e33bf6be9dbdc562b6c4b77e910e52f7387fe9553cdf68"
PHONE_NUMBER_ID = "597907523413541"
NUMERO_DESTINO = "541150466241"
# ---------------------

def enviar_mensaje(texto: str):
    url = f"https://api.kapso.ai/meta/whatsapp/v24.0/{PHONE_NUMBER_ID}/messages"
    
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": KAPSO_API_KEY
    }
    
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": NUMERO_DESTINO,
        "type": "text",
        "text": {"body": texto}
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        print(f"✅ Mensaje enviado: {texto}")
    else:
        print(f"❌ Error {response.status_code}: {response.text}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python enviar_ws.py \"Tu mensaje aquí\"")
        sys.exit(1)
    
    mensaje = " ".join(sys.argv[1:])
    enviar_mensaje(mensaje)