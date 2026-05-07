# Gestion de personas

Aplicacion interna para cargar y consultar personas que trabajan con el usuario y su equipo.

## Estado

Proyecto en etapa inicial con Spec-Driven Development.

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
