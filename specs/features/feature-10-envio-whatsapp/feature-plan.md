# Feature Plan — Feature 10: Envío de mensaje WhatsApp

## Objetivo

Implementar una página dedicada en el frontend que permita enviar un mensaje de texto vía WhatsApp al número configurado, usando el backend FastAPI como intermediario hacia Kapso.

## Grupos de tareas

### Grupo 1 — Backend: endpoint de envío

**Archivos a tocar:**
- `backend/app/api/whatsapp.py` (nuevo)
- `backend/app/services/whatsapp_service.py` (nuevo)
- `backend/app/main.py` (registrar router)

**Tareas:**
1. Crear `whatsapp_service.py` con función `send_message(text: str) -> dict` que llame a la API de Kapso via HTTP usando `requests`, leyendo `KAPSO_API_KEY`, `PHONE_NUMBER_ID` y `NUMERO_DESTINO` desde variables de entorno.
2. Crear `whatsapp.py` con router FastAPI y endpoint `POST /whatsapp/send` que reciba `{"message": "texto"}` y llame al service.
3. Registrar el router en `main.py` bajo el prefijo `/whatsapp`.

**Contrato del endpoint:**
```
POST /whatsapp/send
Body: { "message": "texto del mensaje" }

Respuesta 200: { "status": "ok" }
Respuesta 4xx/5xx: { "detail": "descripcion del error" }
```

### Grupo 2 — Backend: variables de entorno

**Archivos a tocar:**
- `backend/app/core/config.py`

**Tareas:**
1. Agregar `KAPSO_API_KEY`, `PHONE_NUMBER_ID` y `NUMERO_DESTINO` al modelo `Settings` de pydantic-settings si no están ya presentes.

### Grupo 3 — Frontend: página de envío

**Archivos a tocar:**
- `frontend/src/pages/EnvioWhatsapp.jsx` (nuevo)
- `frontend/src/api/whatsapp.js` (nuevo)
- `frontend/src/App.jsx` (agregar ruta)
- `frontend/src/components/Navbar.jsx` o equivalente (agregar submenú)

**Tareas:**
1. Crear `whatsapp.js` con función `sendMessage(text)` que haga `POST` a `/api/whatsapp/send` (o `http://localhost:8000/whatsapp/send` en desarrollo).
2. Crear `EnvioWhatsapp.jsx` con:
   - Campo `<textarea>` o `<input>` para el texto del mensaje.
   - Botón "Enviar".
   - Validación: deshabilitar botón si el campo está vacío.
   - Estado de feedback: mensaje de éxito en verde o error en rojo.
   - Estado de carga: deshabilitar botón mientras se procesa el envío.
3. Agregar ruta `/whatsapp` en `App.jsx` apuntando a `EnvioWhatsapp`.
4. Agregar en el menú de navegación existente una entrada **"WS"** con submenú desplegable que contenga el ítem **"Msj1"** apuntando a `/whatsapp`.

### Grupo 4 — Deploy config

**Archivos a tocar:**
- `.env.example`

**Tareas:**
1. Verificar que `.env.example` documenta `KAPSO_API_KEY`, `PHONE_NUMBER_ID` y `NUMERO_DESTINO`. Agregar si faltan.

## Dependencias entre grupos

- Grupo 2 debe ejecutarse antes de Grupo 1.
- Grupo 1 debe completarse antes de testear Grupo 3.
- Grupo 4 es independiente, puede hacerse en cualquier momento.

## Qué NO hacer

- No implementar recepción de mensajes.
- No guardar historial en Supabase.
- No permitir que el usuario ingrese el número de destino.
- No modificar tablas existentes en Supabase.
- No cambiar la lógica de otras páginas.
