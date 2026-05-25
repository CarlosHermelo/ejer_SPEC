# Feature Plan — Feature 7: Envío de mensajes a WhatsApp

## Objetivo

Crear un script Python standalone que envíe un mensaje de texto a WhatsApp usando Kapso (wrapper de Meta WhatsApp Cloud API), ejecutable desde línea de comandos.

## Archivos a tocar

- `backend/scripts/send_whatsapp.py` — script principal (nuevo)
- `backend/requirements.txt` — agregar dependencia `kapso`
- `.env.example` — documentar las variables de entorno necesarias

## Grupos de tareas

### Grupo 1 — Dependencia

1. Agregar `kapso` a `backend/requirements.txt`.

### Grupo 2 — Variables de entorno

1. Agregar al archivo `.env.example` (o crearlo si no existe) las tres variables requeridas:
   - `KAPSO_API_KEY`
   - `KAPSO_PHONE_NUMBER_ID`
   - `WHATSAPP_DEST_NUMBER`

### Grupo 3 — Script

1. Crear `backend/scripts/__init__.py` vacío si la carpeta no existe.
2. Crear `backend/scripts/send_whatsapp.py` con:
   - Lectura de credenciales desde variables de entorno.
   - Validación de que el argumento de texto fue pasado; si no, error y exit(1).
   - Inicialización del cliente Kapso con las credenciales.
   - Envío del mensaje de texto al número destino.
   - Print de confirmación en éxito, print de error y exit(1) en falla.

## Dependencias entre grupos

- Grupo 1 y Grupo 2 son independientes entre sí.
- Grupo 3 depende de Grupo 1 (la librería debe estar declarada) y Grupo 2 (las variables deben estar documentadas).

## Qué NO hacer

- No crear endpoint HTTP en FastAPI.
- No modificar el frontend.
- No hardcodear credenciales.
- No implementar recepción de mensajes.
- No agregar lógica de reintentos ni colas.
