# Feature 7 — Envío de mensajes a WhatsApp

## Qué debe hacer

- Proveer un script Python en el backend que acepte un texto por argumento de línea de comandos y lo envíe como mensaje de WhatsApp al número personal del usuario.
- La integración usa **Kapso** como plataforma de WhatsApp (Meta WhatsApp Cloud API).
- El SDK de Kapso se consume via requests HTTP directo, sin librerías adicionales de WhatsApp.
- El script debe poder ejecutarse directamente con `python send_whatsapp.py "texto del mensaje"`.

## Reglas de negocio

- El texto del mensaje es obligatorio; si no se pasa, el script debe mostrar un error claro y salir con código distinto de 0.
- El número destino es el número personal verificado del usuario en el sandbox de Kapso.
- Las credenciales deben leerse desde variables de entorno, no hardcodeadas en el código.
- Si el envío falla, el script debe imprimir el error y salir con código de error.
- Si el envío es exitoso, el script debe imprimir una confirmación con el mensaje enviado.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `KAPSO_API_KEY` | Clave de autenticación de la API de Kapso |
| `PHONE_NUMBER_ID` | ID del número de teléfono registrado en Kapso/Meta |
| `NUMERO_DESTINO` | Número WhatsApp destino verificado en sandbox (formato internacional sin +) |

Los valores se almacenan en `.env` local (gitignored). El `.env.example` documenta las claves sin valores.

## Fuera del scope

- Recepción de mensajes entrantes.
- Grabación de respuestas en markdown.
- Integración con el frontend React.
- Endpoint HTTP en FastAPI para este envío.
- Envío a múltiples números.
- Soporte a mensajes con formato (imágenes, archivos, plantillas).

## Decisiones tomadas

- Kapso como plataforma; acceso via HTTP directo con `requests`, sin SDK propio de Kapso instalado como paquete.
- El script carga el .env automaticamente via python-dotenv (patron de arquitectura del proyecto).
- Endpoint de envio: `https://api.kapso.ai/meta/whatsapp/v24.0/{PHONE_NUMBER_ID}/messages`
- Header de autenticacion: `X-API-Key: {KAPSO_API_KEY}` (no usar `Authorization: Bearer`).
- Payload incluye `recipient_type: individual`.
- El script es standalone en `backend/scripts/send_whatsapp.py`.
- Nombres de variables de entorno: `KAPSO_API_KEY`, `PHONE_NUMBER_ID`, `NUMERO_DESTINO`.




