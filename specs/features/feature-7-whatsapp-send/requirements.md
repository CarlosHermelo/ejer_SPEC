# Feature 7 — Envío de mensajes a WhatsApp

## Qué debe hacer

- Proveer un script Python en el backend que acepte un texto por argumento de línea de comandos y lo envíe como mensaje de WhatsApp al número personal del usuario.
- La integración debe usar **Kapso**, wrapper de Meta WhatsApp Cloud API.
- El script debe poder ejecutarse directamente con `python send_whatsapp.py "texto del mensaje"`.

## Reglas de negocio

- El texto del mensaje es obligatorio; si no se pasa, el script debe mostrar un error claro y salir con código distinto de 0.
- El número destino es el número personal verificado del usuario en el sandbox de Kapso.
- Las credenciales (API key, Phone Number ID, número destino) deben leerse desde variables de entorno, no hardcodeadas en el código.
- Si el envío falla, el script debe imprimir el error y salir con código de error.
- Si el envío es exitoso, el script debe imprimir una confirmación con el mensaje enviado.

## Fuera del scope

- Recepción de mensajes entrantes.
- Grabación de respuestas en markdown.
- Integración con el frontend React.
- Endpoint HTTP en FastAPI para este envío.
- Envío a múltiples números.
- Soporte a mensajes con formato (imágenes, archivos, plantillas).

## Decisiones tomadas

- Se usa Kapso como librería de integración con Meta WhatsApp Cloud API.
- Por ahora el script es standalone en `backend/scripts/send_whatsapp.py`.
- Credenciales vía variables de entorno: `KAPSO_API_KEY`, `KAPSO_PHONE_NUMBER_ID`, `WHATSAPP_DEST_NUMBER`.
