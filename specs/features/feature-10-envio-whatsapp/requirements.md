# Feature 10 — Envío de mensaje WhatsApp

## Qué debe hacer

- El menú de navegación principal tiene una entrada **"WS"** con un submenú desplegable.
- El submenú de "WS" contiene el ítem **"Msj1"**.
- Al seleccionar "Msj1" el usuario navega a la página dedicada de envío de WhatsApp.
- La página contiene un campo de texto para escribir el mensaje y un botón "Enviar".
- Al presionar el botón, el frontend llama a un endpoint del backend FastAPI.
- El backend usa Kapso (Meta WhatsApp Cloud API) para enviar el mensaje al número configurado en `NUMERO_DESTINO`.
- La página muestra feedback visible al usuario: "Mensaje enviado con éxito" si la operación fue correcta, o el texto del error si falló.

## Reglas de negocio

- El número de destino es fijo: se lee desde la variable de entorno `NUMERO_DESTINO`. No es configurable por el usuario.
- El campo de texto no puede estar vacío al enviar (validación en frontend).
- El endpoint del backend devuelve 200 con `{"status": "ok"}` si el envío fue exitoso.
- El endpoint devuelve un error HTTP con mensaje descriptivo si Kapso falla.
- Las credenciales de Kapso (`KAPSO_API_KEY`, `PHONE_NUMBER_ID`, `NUMERO_DESTINO`) se leen desde variables de entorno, nunca hardcodeadas.

## Fuera de scope

- Recepción de mensajes WhatsApp.
- Historial de mensajes enviados.
- Selección de número de destino por el usuario.
- Autenticación de usuarios.
- Integración con la tabla `personas`.

## Decisiones tomadas

- El envío pasa por el backend FastAPI, no directamente desde el frontend a Kapso.
- Se reutiliza la integración Kapso existente (HTTP directo con `requests`).
- La página se integra al menú de navegación de Feature 9.
