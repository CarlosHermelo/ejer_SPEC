# Feature 1 - Estructura del proyecto

## Objetivo

Crear la estructura base monorepo del proyecto para frontend, backend, specs, Docker y documentacion.

## Alcance

- Crear carpeta `backend/`.
- Crear carpeta `backend/app/`.
- Crear subcarpetas backend:
  - `api/`
  - `models/`
  - `schemas/`
  - `services/`
  - `db/`
  - `observability/`
- Crear carpeta `frontend/`.
- Crear carpeta `frontend/src/`.
- Crear subcarpetas frontend:
  - `components/`
  - `pages/`
  - `api/`
  - `styles/`
- Crear archivos base de documentacion y configuracion:
  - `README.md`
  - `.gitignore`
  - `docker-compose.yml`

## Reglas

- No instalar dependencias en esta feature.
- No crear codigo funcional de API ni UI.
- No crear modelos de datos.
- No configurar OpenTelemetry todavia.

## Fuera de scope

- Endpoints HTTP.
- Componentes React funcionales.
- Base de datos.
- Migraciones.
- Tests.
- Docker funcional completo.

## Decisiones tomadas

- El proyecto sera monorepo.
- La separacion de carpetas debe reflejar la arquitectura definida en `specs/tech-stack.md`.
