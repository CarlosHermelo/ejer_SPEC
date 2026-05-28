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
- Motor subyacente: PostgreSQL
- Cliente Python: `supabase` (`supabase>=2.0.0`)
- Las tablas se crean y gestionan directamente en el dashboard de Supabase o via SQL Editor
- No se usan migraciones locales (Alembic queda fuera del stack)
- No se usa SQLAlchemy ni SQLite

## Observability

- OpenTelemetry

## Deploy - Vercel

- **Vercel** como plataforma de deploy full-stack (frontend + backend en un solo proyecto).
- El frontend (React + Vite) se buildea con `cd frontend && npm install && npm run build`. El output es `frontend/dist`.
- El backend (FastAPI) corre como funcion serverless Python en `api/index.py`.
- `api/index.py` es un wrapper Starlette que monta la app FastAPI bajo el prefijo `/api`, para que Vercel enrute `/api/*` al runtime Python y FastAPI vea internamente `/personas`, `/health`, etc.
- `vercel.json` en la raiz del repo define el build, el output directory y los rewrites.
- Las variables de entorno del backend viven en el **dashboard de Vercel**, no en el repo.
- El archivo `api/requirements.txt` declara las dependencias Python para el runtime de Vercel. Debe estar en UTF-8 sin BOM.
- URL de produccion: `https://ejer-spec.vercel.app`

### Routing en Vercel

```
/api/*  ->  api/index.py  (FastAPI serverless)
/*      ->  frontend/dist/index.html  (React SPA)
```

### Variables de entorno por entorno

| Variable | Local (.env) | Vercel (dashboard) |
|----------|--------------|--------------------|
| `SUPABASE_URL` | si | si (Production + Preview) |
| `SUPABASE_KEY` | si | si (Production + Preview) |
| `KAPSO_API_KEY` | si | si |
| `PHONE_NUMBER_ID` | si | si |
| `NUMERO_DESTINO` | si | si |

## Entorno local

- GitHub para versionado del proyecto
- Python venv para el backend local (`backend/.venv`)
- Node.js 24.x para el frontend local

## Workflow de desarrollo

- Trabajar siempre con Spec-Driven Development.
- Antes de implementar una feature debe existir una spec aprobada.
- Cada feature debe tener validacion definida con checks [AGENTE] y [HUMANO].
- Los checks [AGENTE] los ejecuta el agente de forma autonoma.
- Los checks [HUMANO] quedan reportados para revision manual.
- Siempre trabajar en rama feature/xxx. Nunca pushear directo a main.
- Cada PR abre automaticamente un Preview Deploy en Vercel con URL unica.
- Verificar que el Preview Deploy funciona antes de mergear a main.
- El merge a main dispara el deploy de produccion en Vercel.

### Flujo completo

```
git checkout -b feature/nombre
# cambios
git push -> PR en GitHub -> Preview Deploy (URL unica en Vercel)
# verificar preview
merge PR -> Deploy a produccion (ejer-spec.vercel.app)
```

## Politica de versiones

- Usar versiones estables y soportadas, no prerelease.
- Priorizar versiones LTS cuando existan, como Node.js.
- Fijar major/minor en configuracion para evitar actualizaciones accidentales.
- Permitir patches compatibles dentro de la misma rama estable.

## Arquitectura

La aplicacion se organiza como monorepo con frontend React + Vite y backend FastAPI. La persistencia es 100% Supabase (PostgreSQL en la nube). El deploy es full-stack en Vercel.

Estructura base:

```
api/
  index.py          - wrapper Starlette para Vercel (monta FastAPI bajo /api)
  requirements.txt  - dependencias Python para el runtime serverless de Vercel
backend/
  app/
    main.py         - FastAPI app + CORS middleware
    api/            - endpoints HTTP
    schemas/        - schemas Pydantic
    services/       - reglas de negocio
    db/             - cliente Supabase singleton
    core/           - config (pydantic-settings, lee .env)
    observability/  - OpenTelemetry
  requirements.txt
frontend/
  src/
    components/
    pages/
    api/            - cliente HTTP hacia FastAPI
    styles/
  .env.development  - VITE_API_BASE_URL=http://localhost:8000
  .env.production   - VITE_API_BASE_URL=/api
prueba/             - scripts Python standalone, no forman parte del deploy
specs/
vercel.json         - config de deploy full-stack (build + routing)
.env                - credenciales locales (NO commiteado)
.env.example        - plantilla sin valores reales (commiteado)
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

La carpeta `prueba/` contiene scripts Python standalone para experimentacion e integracion con Supabase. No forma parte del backend ni del frontend productivo.

## CORS

El backend habilita CORS para el frontend local. La lista de origenes permitidos se configura en `Settings.cors_origins` (default: `["http://localhost:5173", "http://localhost:3000"]`). En produccion no es necesario porque frontend y backend comparten el mismo dominio Vercel.

## Variables de entorno del frontend

El frontend usa archivos `.env` de Vite para apuntar al backend segun el entorno:

| Archivo | Variable | Valor |
|---------|----------|-------|
| `.env.development` | `VITE_API_BASE_URL` | `http://localhost:8000` |
| `.env.production` | `VITE_API_BASE_URL` | `/api` |

En produccion el valor `/api` es relativo, por lo que funciona en cualquier URL de Vercel (produccion y preview) sin configuracion adicional.

## Restricciones

- No implementar funcionalidades fuera de la spec aprobada.
- No agregar login, permisos, pagos, tareas ni documentos durante el MVP.
- El proyecto debe versionarse en GitHub.
- No usar Next.js en el MVP; React + Vite es suficiente.
- No hacer push, PR ni merge sin validacion previa.
- **No usar SQLite, SQLAlchemy ni Alembic.** Toda persistencia va a Supabase.
- **No subir credenciales al repositorio.** `.env` debe estar excluido por `.gitignore`.
- **Las variables de entorno del backend viven en el dashboard de Vercel**, no en el repo.

## Dependencias Python para Supabase

Los scripts Python que se conecten a Supabase requieren estas dependencias:

```
pip install supabase python-dotenv
```

| Libreria | Uso |
|----------|-----|
| `supabase` | Cliente oficial de Supabase para Python |
| `python-dotenv` | Carga variables de entorno desde el archivo `.env` |

## Uso de variables de entorno con .env

Todo script Python que use Supabase debe cargar su configuracion desde variables de entorno. No se deben hardcodear claves, URLs, passwords ni tokens dentro del codigo fuente.

### Estructura del archivo .env

El archivo `.env` contiene la configuracion real de conexion. **No debe subirse al repositorio.**

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=clave_publica_o_publishable_key
```

| Variable | Descripcion |
|----------|-------------|
| `SUPABASE_URL` | URL del proyecto Supabase (ej: `https://xxxx.supabase.co`) |
| `SUPABASE_KEY` | Clave anon/publica del proyecto Supabase |

### Archivo .env.example

Debe existir un archivo `.env.example` como plantilla para otros entornos o desarrolladores. **Si puede subirse al repositorio. No debe contener claves reales.** Sirve solo como referencia de las variables requeridas.

```
SUPABASE_URL=
SUPABASE_KEY=
```

### .gitignore

El archivo `.gitignore` debe incluir la siguiente linea para evitar subir secretos:

```
.env
```

### Patron de inicializacion del cliente Supabase en Python

```python
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not url:
    raise EnvironmentError("Error: falta SUPABASE_URL en el archivo .env")
if not key:
    raise EnvironmentError("Error: falta SUPABASE_KEY en el archivo .env")

supabase = create_client(url, key)
```

En el backend productivo el cliente se inicializa una sola vez en `backend/app/db/client.py` y se importa desde ahi en el resto del backend. En scripts standalone de `prueba/` se inicializa al inicio del script.

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

## Gestion de tablas

- Las tablas se crean en el **SQL Editor de Supabase** o desde el **Table Editor** del dashboard.
- El agente debe documentar el SQL de creacion de cada tabla nueva en el `requirements.md` de la feature correspondiente.
- Las tablas del backend productivo deben tener `id UUID DEFAULT gen_random_uuid() PRIMARY KEY` y `created_at TIMESTAMPTZ DEFAULT NOW()`.
- Las tablas de prueba pueden usar `id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY`.

## Schema

### Tabla registros (prueba/experimentacion)

Tabla para validar la conexion entre Python y Supabase. Se usa para insertar y consultar registros de prueba.

```sql
CREATE TABLE registros (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    descripcion TEXT NOT NULL,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `id` | BIGINT | Identificador unico generado automaticamente |
| `descripcion` | TEXT | Texto obligatorio del registro |
| `creado_en` | TIMESTAMPTZ | Fecha y hora automatica de creacion |

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

## Configuracion RLS para pruebas

Supabase aplica Row Level Security (RLS) por defecto. Para pruebas simples con el cliente `anon`, la tabla `registros` puede tener policies que permitan INSERT y SELECT sin autenticacion.

**IMPORTANTE: estas policies son solo para laboratorio, pruebas locales o experimentacion. No son configuracion segura para produccion.**

```sql
CREATE POLICY "Permitir insert anon"
ON public.registros
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Permitir select anon"
ON public.registros
FOR SELECT
TO anon
USING (true);
```

En produccion se deberan usar reglas mas restrictivas. Se debera evaluar el uso de usuarios autenticados, backend controlado o policies especificas por usuario/rol.

## Criterios tecnicos obligatorios

- El codigo debe conectarse a Supabase usando variables de entorno.
- No se deben subir secretos al repositorio.
- `.env` debe estar excluido por `.gitignore`.
- `.env.example` debe documentar las variables necesarias sin valores reales.
- Los scripts deben fallar de forma clara si falta configuracion.
- Las operaciones iniciales permitidas son INSERT y SELECT sobre tablas de prueba.
- Las configuraciones RLS abiertas solo se permiten para pruebas.
- Toda futura tabla de prueba debera documentar sus policies si se accede desde la API publica de Supabase.

## APIs e integraciones

- API HTTP provista por FastAPI para que el frontend gestione personas.
- Instrumentacion con OpenTelemetry.
- **Supabase** como base de datos PostgreSQL en la nube. Cliente Python: `supabase`.
- **Kapso** como plataforma de WhatsApp (wrapper de Meta WhatsApp Cloud API). Dos opciones de integracion disponibles:
  - **Kapso CLI** (@kapso/cli): herramienta de linea de comandos. Instalacion: `npm install -g @kapso/cli`. Requiere Node.js >= 20.19. Autenticacion via `KAPSO_API_KEY`.
  - **HTTP directo**: requests Python a la API REST de Kapso. Usado en scripts standalone del backend.
- Variables de entorno requeridas para Kapso (entorno sandbox):
  - `KAPSO_API_KEY`: clave de autenticacion de la API de Kapso
  - `PHONE_NUMBER_ID`: ID del numero de telefono registrado en Kapso/Meta
  - `NUMERO_DESTINO`: numero de WhatsApp destino verificado en sandbox (formato internacional sin +)
- Los valores de estas variables NO se versionan en el repo; se almacenan en `.env` local. El `.env.example` documenta las claves sin valores.
- Endpoint de envio Kapso: https://api.kapso.ai/meta/whatsapp/v24.0/{PHONE_NUMBER_ID}/messages
- Autenticacion Kapso: header X-API-Key: {KAPSO_API_KEY}.