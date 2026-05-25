# Validation — Feature 7: Envío de mensajes a WhatsApp

| # | Criterio | Cómo verificarlo | Responsable | Pass/Fail |
|---|----------|-----------------|-------------|-----------|
| 1 | `kapso` está en `requirements.txt` | `grep kapso backend/requirements.txt` | [AGENTE] | |
| 2 | `.env.example` documenta las 3 variables | Leer el archivo y verificar presencia de `KAPSO_API_KEY`, `KAPSO_PHONE_NUMBER_ID`, `WHATSAPP_DEST_NUMBER` | [AGENTE] | |
| 3 | El script existe en la ruta correcta | `ls backend/scripts/send_whatsapp.py` | [AGENTE] | |
| 4 | Sin argumento, el script sale con error | `python backend/scripts/send_whatsapp.py` debe imprimir error y exit code != 0 | [AGENTE] | |
| 5 | Con credenciales válidas y texto, el mensaje llega a WhatsApp | Correr `python backend/scripts/send_whatsapp.py "test desde agente"` con `.env` cargado y verificar recepción en el teléfono | [HUMANO] | |
| 6 | El script imprime confirmación en éxito | Observar stdout al correr el comando del criterio 5 | [HUMANO] | |
| 7 | Con credenciales inválidas, el script imprime el error y sale con código != 0 | Correr con `KAPSO_API_KEY=invalida` y verificar output | [HUMANO] | |
