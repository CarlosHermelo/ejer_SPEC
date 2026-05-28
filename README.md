# Gestion de personas

Aplicacion interna para cargar y consultar personas. Construida con React + FastAPI + Supabase.

## Stack

| Capa | Tecnologia |
|---|---|
| Frontend | React 19 + Vite 7 |
| Backend | FastAPI (Python) |
| Base de datos | Supabase (PostgreSQL) |
| Mensajeria | Kapso (WhatsApp via Meta API) |
| Observabilidad | OpenTelemetry (base) |
| Deploy | Vercel |
| CI | GitHub Actions |

## Estructura

```
api/              Funcion serverless para Vercel (wrapper FastAPI)
backend/
  app/
    api/          Endpoints HTTP
    schemas/      Pydantic schemas
    services/     Logica de negocio
    db/           Cliente Supabase
    observability/ OpenTelemetry
frontend/
  src/
    api/          Cliente HTTP hacia FastAPI
    components/   Componentes React
    pages/        Pantallas
    styles/       Estilos globales
prueba/           Scripts Python standalone para experimentacion
specs/            Documentacion SDD (mission, tech-stack, roadmap, features)
vercel.json       Configuracion Vercel (raiz del repo)
docker-compose.yml
```

## Supabase — tabla personas

Crear esta tabla en Supabase SQL Editor antes de usar el backend:

```sql
CREATE TABLE personas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    fecha_alta DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar los valores:

```powershell
Copy-Item .env.example .env
```

Variables requeridas:

| Variable | Descripcion |
|---|---|
| `SUPABASE_URL` | URL del proyecto Supabase (ej: `https://xxxx.supabase.co`) |
| `SUPABASE_KEY` | Clave anon/publica de Supabase |
| `KAPSO_API_KEY` | Clave de la API de Kapso |
| `PHONE_NUMBER_ID` | ID del numero de telefono en Kapso |
| `NUMERO_DESTINO` | Numero WhatsApp destino (formato internacional sin +) |

Variables opcionales:

| Variable | Default | Descripcion |
|---|---|---|
| `APP_ENV` | `local` | Entorno de ejecucion |
| `OTEL_SERVICE_NAME` | `ejer-spec-backend` | Nombre del servicio en OTel |
| `OTEL_TRACES_EXPORTER` | `none` | Exportador de trazas |
| `CORS_ORIGINS` | `http://localhost:5173` | Origenes permitidos (separados por coma) |

## Ejecucion local

### Backend (FastAPI)

```powershell
# Activar entorno virtual
.\.venv\Scripts\Activate.ps1

# Instalar dependencias (primera vez o cuando cambien)
pip install -r backend\requirements.txt

# Iniciar servidor
uvicorn backend.app.main:app --reload
```

Backend disponible en `http://localhost:8000`.
Documentacion interactiva: `http://localhost:8000/docs`.

### Frontend (React)

```powershell
cd frontend
npm install   # primera vez o cuando cambien dependencias
npm run dev
```

Frontend disponible en `http://localhost:5173`.

En desarrollo el frontend llama al backend en `http://localhost:8000` (configurado en `frontend/.env.development`).

### Tests frontend

```powershell
cd frontend
npm test
```

### Script WhatsApp standalone

```powershell
.\.venv\Scripts\Activate.ps1
python prueba\envio.py "Hola desde el script"
```

## Deploy en Vercel

### Arquitectura en Vercel

- El frontend React se sirve como sitio estatico desde `frontend/dist`.
- El backend FastAPI se ejecuta como funcion serverless bajo `/api/*`.
- Las rutas `/api/*` van al backend; todo lo demas va al frontend (SPA routing).

### Configuracion del proyecto en Vercel

1. Conectar el repo de GitHub a Vercel.
2. En la configuracion del proyecto, establecer **Root Directory** como `.` (raiz del repo, no `frontend/`).
3. Agregar las siguientes variables de entorno en Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `KAPSO_API_KEY`
   - `PHONE_NUMBER_ID`
   - `NUMERO_DESTINO`

El `vercel.json` en la raiz del repo configura automaticamente el build y las rutas.

### Flujo PR con Vercel Preview

```
1. Crear branch desde main
2. Hacer cambios y commits
3. Abrir Pull Request en GitHub
4. Vercel genera automaticamente una URL de Preview para ese PR
5. Probar la funcionalidad en la URL de Preview
6. Aprobar y mergear a main
7. Vercel hace el deploy de produccion automaticamente
```

URL de produccion actual: `https://ejer-spec.vercel.app`

## API

Endpoints disponibles:

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/health` | Healthcheck del backend |
| `POST` | `/personas` | Crea una persona |
| `GET` | `/personas` | Lista personas cargadas |

Ejemplo `POST /personas`:

```json
{
  "nombre": "Ada",
  "apellido": "Lovelace",
  "fecha_alta": "2026-05-07"
}
```

En Vercel estas rutas quedan bajo `/api/personas` y `/api/health`.
Localmente siguen siendo `http://localhost:8000/personas`.

## Workflow SDD

Cada feature se define primero en `specs/features/` con:
- `requirements.md`
- `feature-plan.md`
- `validation.md`

Ver `AGENTS.md` para el flujo completo de trabajo con agentes.
