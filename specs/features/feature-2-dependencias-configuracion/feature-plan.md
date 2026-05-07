# Feature Plan - Dependencias y configuracion

## Objetivo

Dejar el proyecto instalable y ejecutable en Docker sin implementar todavia funcionalidades de personas.

## Grupos de tareas

### Grupo 1 - Frontend

Crear configuracion base:

- `frontend/package.json`
- `frontend/package-lock.json` si se usa npm
- `frontend/index.html`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/styles/global.css`
- `frontend/Dockerfile`

Configurar scripts:

- `dev`
- `build`
- `preview`

### Grupo 2 - Backend

Crear configuracion base:

- `backend/pyproject.toml`
- `backend/app/main.py`
- `backend/app/core/config.py`
- `backend/Dockerfile`
- `.venv/` para desarrollo local

Agregar dependencias:

- FastAPI
- Uvicorn
- SQLAlchemy
- Alembic
- OpenTelemetry para FastAPI/ASGI

Documentar activacion del entorno virtual:

- Windows PowerShell: `.\\.venv\\Scripts\\Activate.ps1`
- Linux/macOS: `source .venv/bin/activate`

### Grupo 3 - Base de datos y entorno

Crear:

- `backend/app/db/session.py`
- `backend/app/db/base.py`
- `.env`
- `.env.example`

Definir variable:

- `DATABASE_URL`
- `APP_ENV`
- `BACKEND_HOST`
- `BACKEND_PORT`
- `FRONTEND_PORT`
- `VITE_API_BASE_URL`
- variables base de OpenTelemetry necesarias para el MVP

Reglas:

- `.env` se usa para ejecucion local y Docker Compose.
- `.env.example` se versiona como referencia.
- `.env` no se versiona.

### Grupo 4 - Docker Compose

Completar `docker-compose.yml` con servicios:

- `backend`
- `frontend`

Definir volumen para SQLite.

### Grupo 5 - Documentacion

Actualizar `README.md` con comandos:

- levantar con Docker Compose
- instalar dependencias localmente
- crear y activar `.venv`
- ejecutar frontend
- ejecutar backend
- configurar `.env` desde `.env.example`
- remoto GitHub del proyecto
- criterio para push y Pull Request segun workflow SDD

### Grupo 6 - GitHub remoto

Configurar el remoto `origin`:

- `https://github.com/CarlosHermelo/ejer_SPEC`

Verificar que el remoto queda registrado.

No abrir Pull Request en esta feature salvo aprobacion humana explicita despues de validar.

## Archivos a tocar

- `frontend/**`
- `backend/**`
- `docker-compose.yml`
- `.env`
- `.env.example`
- `README.md`
- configuracion Git local del remoto `origin`

## Que NO hacer

- No crear endpoints de personas.
- No crear formularios.
- No crear tablas ni migraciones de `persona`.
- No agregar login, permisos, pagos, tareas ni documentos.
- No abrir Pull Request automaticamente.
- No hacer push sin validacion previa.
- No versionar `.venv/`.
- No versionar `.env`.
