# Tech Stack

## Frontend

- React 19.2.x
- Vite
- Node.js 24.x LTS

## Backend

- FastAPI 0.136.x
- Python 3.14.x
- SQLAlchemy
- Alembic

## Base de datos

- SQLite
- Migraciones con Alembic

## Observability

- OpenTelemetry

## Entorno y ejecucion

- Docker Desktop 4.69.x
- Docker Engine 29.3.x
- Docker Compose
- GitHub para versionado del proyecto

## Workflow de desarrollo

- Trabajar siempre con Spec-Driven Development.
- Antes de implementar una feature debe existir una spec aprobada.
- Cada feature debe tener validacion definida con checks `[AGENTE]` y `[HUMANO]`.
- Los checks `[AGENTE]` los ejecuta el agente de forma autonoma.
- Los checks `[HUMANO]` quedan reportados para revision manual.
- Despues de validar una feature se debe hacer commit, push a GitHub, abrir PR y mergear a la rama principal cuando este aprobada.

## Politica de versiones

- Usar versiones estables y soportadas, no prerelease.
- Priorizar versiones LTS cuando existan, como Node.js.
- Fijar major/minor en configuracion para evitar actualizaciones accidentales.
- Permitir patches compatibles dentro de la misma rama estable.

## Arquitectura inicial

La aplicacion se organizara como monorepo con frontend React + Vite, backend FastAPI y persistencia en SQLite.

Estructura base:

```text
backend/
  app/
    main.py
    api/
    models/
    schemas/
    services/
    db/
    observability/
frontend/
  src/
    components/
    pages/
    api/
    styles/
specs/
docker-compose.yml
README.md
```

El backend debe usar capas simples:

- `api`: endpoints HTTP.
- `models`: modelos SQLAlchemy.
- `schemas`: schemas Pydantic.
- `services`: reglas de negocio.
- `db`: conexion, sesiones y configuracion de SQLite.
- `observability`: configuracion de OpenTelemetry.

El frontend debe separar:

- `components`: componentes reutilizables.
- `pages`: pantallas principales.
- `api`: cliente HTTP hacia FastAPI.
- `styles`: estilos globales o compartidos.

## Restricciones

- No implementar funcionalidades fuera de la spec aprobada.
- No agregar login, permisos, pagos, tareas ni documentos durante el MVP.
- La configuracion debe quedar preparada para ejecutarse con Docker.
- El proyecto debe versionarse en GitHub.
- No usar Next.js en el MVP; React + Vite es suficiente.
- No hacer push, PR ni merge sin validacion previa.


## Variables de entorno y configuracion local

- Todo el proyecto usa python-dotenv para cargar variables desde .env automaticamente al iniciar cualquier script o modulo Python.
- El archivo .env nunca se versiona (incluido en .gitignore). El archivo .env.example documenta todas las claves con valores de referencia.
- Cualquier script Python standalone debe incluir al inicio: rom dotenv import load_dotenv; load_dotenv().
- FastAPI tambien carga .env via pydantic-settings con env_file = ".env".
- Este patron aplica a todo nuevo script o modulo que consuma variables de entorno, sin excepcion.
## APIs e integraciones

- API HTTP provista por FastAPI para que el frontend gestione personas.
- Instrumentacion con OpenTelemetry.
- **Kapso** como plataforma de WhatsApp (wrapper de Meta WhatsApp Cloud API). SDK via requests HTTP directo a la API de Kapso. Sin librerias adicionales de WhatsApp.
- Variables de entorno requeridas para Kapso (entorno sandbox):
  - KAPSO_API_KEY — clave de autenticacion de la API de Kapso
  - PHONE_NUMBER_ID — ID del numero de telefono registrado en Kapso/Meta
  - NUMERO_DESTINO — numero de WhatsApp destino verificado en sandbox (formato internacional sin +)
- Los valores de estas variables NO se versionan en el repo; se almacenan en .env local (incluido en .gitignore). El archivo .env.example documenta las claves sin valores.
- Endpoint de envio: `https://api.kapso.ai/meta/whatsapp/v24.0/{PHONE_NUMBER_ID}/messages`
- Autenticacion: header `X-API-Key: {KAPSO_API_KEY}`. No usar `Authorization: Bearer` ni `x-kapso-api-key`.

## Schema inicial

Entidad `persona`:

- `id`
- `nombre`
- `apellido`
- `fecha_alta`





