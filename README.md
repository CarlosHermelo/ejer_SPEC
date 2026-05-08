# Gestion de personas

Aplicacion interna para cargar y consultar personas que trabajan con el usuario y su equipo.

## Estado

MVP implementado con Spec-Driven Development.

## Alcance del MVP

La aplicacion permite:

- cargar personas con nombre, apellido y fecha de alta
- consultar personas cargadas
- persistir datos en SQLite
- ejecutar backend y frontend con Docker Compose

Fuera del MVP:

- login de usuarios
- permisos por rol
- pagos
- tareas
- documentos
- busqueda
- filtros
- paginacion
- edicion
- borrado

## Estructura

```text
backend/
  app/
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
```

## Workflow

Cada feature se define primero en `specs/features/` con:

- `requirements.md`
- `feature-plan.md`
- `validation.md`

No se implementa codigo fuera de una spec aprobada.

## Repositorio

Remoto oficial:

```bash
git remote add origin https://github.com/CarlosHermelo/ejer_SPEC
```

El push y el Pull Request se hacen despues de validar la feature y cuando corresponda segun el workflow SDD.

## Configuracion local

Crear `.env` desde la plantilla versionada:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Variables principales:

- `DATABASE_URL`
- `BACKEND_PORT`
- `FRONTEND_PORT`
- `VITE_API_BASE_URL`
- `OTEL_SERVICE_NAME`
- `OTEL_TRACES_EXPORTER`

## Entorno virtual backend

Crear el entorno virtual:

```bash
python -m venv .venv
```

Activar en Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Activar en Linux/macOS:

```bash
source .venv/bin/activate
```

Instalar dependencias backend:

```bash
python -m pip install -r backend/requirements.txt
```

Ejecutar backend local:

```bash
uvicorn app.main:app --app-dir backend --reload
```

## Frontend local

Instalar dependencias:

```bash
cd frontend
npm install
```

Ejecutar frontend:

```bash
npm run dev
```

## Docker Compose

Levantar servicios:

```bash
docker compose up --build
```

Validar configuracion:

```bash
docker compose config
```

## API

Backend local por defecto:

```text
http://localhost:8000
```

Endpoints disponibles:

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/health` | Healthcheck del backend |
| POST | `/personas` | Crea una persona |
| GET | `/personas` | Lista personas cargadas |

Payload de `POST /personas`:

```json
{
  "nombre": "Ada",
  "apellido": "Lovelace",
  "fecha_alta": "2026-05-07"
}
```

Reglas:

- `nombre` es obligatorio
- `apellido` es obligatorio
- `fecha_alta` es obligatoria
- `fecha_alta` no puede ser futura

## Observability

El backend incluye instrumentacion base con OpenTelemetry para FastAPI.

Variables:

- `OTEL_SERVICE_NAME`
- `OTEL_TRACES_EXPORTER`

En el MVP `OTEL_TRACES_EXPORTER=none`. La exportacion a un collector externo queda fuera del MVP.

## Validacion manual

1. Levantar servicios con `docker compose up --build`.
2. Abrir el frontend en `http://localhost:5173`.
3. Cargar una persona con nombre, apellido y fecha de alta.
4. Verificar que aparece en el listado.
5. Probar campos vacios y fecha futura.
