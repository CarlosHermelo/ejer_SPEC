# Feature Plan - Estructura del proyecto

## Objetivo

Preparar la estructura inicial del repositorio sin agregar comportamiento ejecutable.

## Grupos de tareas

### Grupo 1 - Backend

Crear:

- `backend/`
- `backend/app/`
- `backend/app/api/`
- `backend/app/models/`
- `backend/app/schemas/`
- `backend/app/services/`
- `backend/app/db/`
- `backend/app/observability/`

Agregar archivos `.gitkeep` cuando una carpeta vacia necesite quedar versionada.

### Grupo 2 - Frontend

Crear:

- `frontend/`
- `frontend/src/`
- `frontend/src/components/`
- `frontend/src/pages/`
- `frontend/src/api/`
- `frontend/src/styles/`

Agregar archivos `.gitkeep` cuando una carpeta vacia necesite quedar versionada.

### Grupo 3 - Configuracion y documentacion base

Crear:

- `README.md`
- `.gitignore`
- `docker-compose.yml`

`docker-compose.yml` puede quedar como placeholder minimo sin servicios completos hasta Feature 2.

## Archivos a tocar

- `backend/**`
- `frontend/**`
- `README.md`
- `.gitignore`
- `docker-compose.yml`

## Que NO hacer

- No instalar paquetes.
- No crear `package.json`.
- No crear `pyproject.toml`.
- No crear endpoints.
- No crear pantallas.
- No crear schema de base de datos.
