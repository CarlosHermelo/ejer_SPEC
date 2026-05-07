# Feature 2 - Dependencias y configuracion

## Objetivo

Configurar las dependencias y archivos base para ejecutar el frontend, backend, base SQLite, Docker Compose y observability.

## Alcance

- Configurar frontend con React 19.2.x, Vite y Node.js 24.x LTS.
- Configurar backend con Python 3.14.x, FastAPI 0.136.x, SQLAlchemy, Alembic y Uvicorn.
- Configurar dependencias de OpenTelemetry para FastAPI.
- Configurar Docker Compose con servicios `frontend` y `backend`.
- Preparar persistencia SQLite en una ruta controlada por configuracion.
- Crear el entorno virtual Python del proyecto para desarrollo local.
- Agregar variables de entorno base.
- Crear y documentar el uso del archivo `.env` para configuracion local del proyecto.
- Crear `.env.example` como plantilla versionable.
- Agregar comandos documentados en `README.md`.
- Configurar el repositorio remoto de GitHub del proyecto.
- Dejar documentado que los Pull Requests se abriran cuando corresponda segun el workflow SDD.

## Reglas

- Las versiones deben ser estables, no prerelease.
- Node.js debe usar rama LTS.
- Las dependencias deben quedar fijadas de forma reproducible.
- Docker Compose debe permitir levantar frontend y backend.
- La configuracion debe respetar el monorepo definido.
- El remoto GitHub debe apuntar a `https://github.com/CarlosHermelo/ejer_SPEC`.
- No se debe abrir PR sin implementacion validada y decision humana de avanzar.
- El entorno virtual local debe crearse en `.venv/`.
- `.venv/` no debe versionarse.
- Los comandos backend locales deben documentarse usando activacion previa de `.venv`.
- `.env` no debe versionarse.
- `.env.example` debe contener las variables necesarias sin secretos reales.
- Docker Compose debe leer configuracion desde `.env` cuando corresponda.

## Fuera de scope

- Implementar endpoints de negocio.
- Crear modelo `persona`.
- Crear pantallas de carga o consulta.
- Crear migraciones reales de tablas.
- Configurar CI/CD en GitHub Actions.
- Abrir Pull Request de forma automatica durante esta feature.
- Versionar `.venv/`.
- Versionar `.env` con valores locales reales o secretos.

## Decisiones tomadas

- Frontend con Vite.
- Backend con FastAPI ejecutado por Uvicorn.
- SQLite local persistida mediante volumen Docker.
- OpenTelemetry se configura en modo base, sin depender de un collector externo obligatorio en el MVP.
- El repositorio remoto oficial del proyecto es `https://github.com/CarlosHermelo/ejer_SPEC`.
- Los Pull Requests forman parte del cierre de features cuando sea necesario, despues de validar y pushear cambios.
- El entorno virtual local oficial del backend es `.venv/`.
- `.env` sera la fuente local de configuracion del proyecto.
- `.env.example` sera la plantilla documentada y versionada.
