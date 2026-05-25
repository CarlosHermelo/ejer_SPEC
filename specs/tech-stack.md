# Tech Stack

## Frontend

- React 19.2.x
- Vite
- Node.js 24.x LTS

## Backend

- FastAPI 0.136.x
- Python 3.14.x

## Base de datos

- **Supabase** (PostgreSQL gestionado en la nube)
- Cliente Python: `supabase-py` (`supabase>=2.0.0`)
- Las tablas se crean y gestionan directamente en el dashboard de Supabase o via SQL Editor
- No se usan migraciones locales (Alembic queda fuera del stack)
- No se usa SQLAlchemy ni SQLite

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
- Cada feature debe tener validacion definida con checks [AGENTE] y [HUMANO].
- Los checks [AGENTE] los ejecuta el agente de forma autonoma.
- Los checks [HUMANO] quedan reportados para revision manual.
- Despues de validar una feature se debe hacer commit, push a GitHub, abrir PR y mergear a la rama principal cuando este aprobada.

## Politica de versiones

- Usar versiones estables y soportadas, no prerelease.
- Priorizar versiones LTS cuando existan, como Node.js.
- Fijar major/minor en configuracion para evitar actualizaciones accidentales.
- Permitir patches compatibles dentro de la misma rama estable.

## Arquitectura inicial

La aplicacion se organiza como monorepo con frontend React + Vite y backend FastAPI. La persistencia es 100% Supabase (PostgreSQL en la nube).

Estructura base:

```
backend/
  app/
    main.py
    api/
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

El backend usa capas simples:

- `api`: endpoints HTTP.
- `schemas`: schemas Pydantic.
- `services`: reglas de negocio.
- `db`: cliente Supabase, inicializacion y helpers de acceso a tablas.
- `observability`: configuracion de OpenTelemetry.

El frontend separa:

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
- **No usar SQLite, SQLAlchemy ni Alembic.** Toda persistencia va a Supabase.

## Variables de entorno y configuracion local

- Todo el proyecto usa python-dotenv para cargar variables desde .env automaticamente al iniciar cualquier script o modulo Python.
- El archivo .env nunca se versiona (incluido en .gitignore). El archivo .env.example documenta todas las claves con valores de referencia.
- Cualquier script Python standalone debe incluir al inicio: from dotenv import load_dotenv; load_dotenv().
- FastAPI tambien carga .env via pydantic-settings con env_file = ".env".
- Este patron aplica a todo nuevo script o modulo que consuma variables de entorno, sin excepcion.

### Variables de entorno requeridas para Supabase

| Variable | Descripcion |
|----------|-------------|
| `SUPABASE_URL` | URL del proyecto Supabase (ej: https://xxxx.supabase.co) |
| `SUPABASE_KEY` | Clave anon publica del proyecto Supabase |

Estas variables NO se versionan. Se almacenan en .env local. El .env.example las documenta sin valores.

### Patron de uso del cliente Supabase en Python

```python
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])
```

El cliente se inicializa una sola vez en `backend/app/db/client.py` y se importa desde ahi en el resto del backend.

### Patron de operaciones

```python
# Insertar
supabase.table("nombre_tabla").insert({...}).execute()

# Consultar todos
supabase.table("nombre_tabla").select("*").execute()

# Consultar con filtro
supabase.table("nombre_tabla").select("*").eq("campo", valor).execute()

# Actualizar
supabase.table("nombre_tabla").update({...}).eq("id", id).execute()

# Eliminar
supabase.table("nombre_tabla").delete().eq("id", id).execute()
```

### Gestion de tablas

- Las tablas se crean en el SQL Editor de Supabase o desde el Table Editor del dashboard.
- Toda tabla debe tener:
  - `id UUID DEFAULT gen_random_uuid() PRIMARY KEY`
  - `created_at TIMESTAMPTZ DEFAULT NOW()`
- El agente debe documentar el SQL de creacion de cada tabla nueva en el requirements.md de la feature correspondiente.

## APIs e integraciones

- API HTTP provista por FastAPI para que el frontend gestione personas.
- Instrumentacion con OpenTelemetry.
- **Supabase** como base de datos PostgreSQL en la nube. Cliente Python: `supabase-py`.
- **Kapso** como plataforma de WhatsApp (wrapper de Meta WhatsApp Cloud API). Dos opciones de integracion disponibles:
  - **Kapso CLI** (@kapso/cli): herramienta de linea de comandos. Instalacion: `npm install -g @kapso/cli`. Requiere Node.js >= 20.19. Autenticacion via `KAPSO_API_KEY`.
  - **HTTP directo**: requests Python a la API REST de Kapso. Usado en scripts standalone del backend.
- Variables de entorno requeridas para Kapso (entorno sandbox):
  - KAPSO_API_KEY: clave de autenticacion de la API de Kapso
  - PHONE_NUMBER_ID: ID del numero de telefono registrado en Kapso/Meta
  - NUMERO_DESTINO: numero de WhatsApp destino verificado en sandbox (formato internacional sin +)
- Los valores de estas variables NO se versionan en el repo; se almacenan en .env local. El .env.example documenta las claves sin valores.
- Endpoint de envio Kapso: https://api.kapso.ai/meta/whatsapp/v24.0/{PHONE_NUMBER_ID}/messages
- Autenticacion Kapso: header X-API-Key: {KAPSO_API_KEY}.

## Schema

Las tablas se definen en Supabase. El agente documenta el SQL de cada tabla en el requirements.md de la feature que la introduce.

### Tabla personas (Feature 3)

```sql
CREATE TABLE personas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    fecha_alta DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```
