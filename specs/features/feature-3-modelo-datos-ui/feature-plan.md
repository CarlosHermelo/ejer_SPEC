# Feature Plan - Modelo de datos y diseno UI

## Objetivo

Preparar la base de datos y el contrato visual/funcional de la pantalla principal sin implementar todavia carga ni consulta completas.

## Grupos de tareas

### Grupo 1 - Modelo backend

Antes de ejecutar comandos backend locales, activar el entorno virtual definido en Feature 2:

- Windows PowerShell: `.\\.venv\\Scripts\\Activate.ps1`
- Linux/macOS: `source .venv/bin/activate`

Crear:

- `backend/app/models/persona.py`
- `backend/app/schemas/persona.py`
- migracion Alembic inicial para tabla `personas`

Tabla `personas`:

- `id`
- `nombre`
- `apellido`
- `fecha_alta`

### Grupo 2 - Validaciones backend

Usar la configuracion central creada en Feature 2. No hardcodear rutas de base de datos; tomar `DATABASE_URL` desde `.env` o variables de entorno.

Definir schemas Pydantic:

- schema de lectura
- schema de creacion

Validar:

- campos obligatorios
- strings no vacios
- fecha no futura

### Grupo 3 - Diseno UI base

Crear componentes/pantallas base sin conectar comportamiento final:

- `frontend/src/pages/PersonasPage.jsx`
- `frontend/src/components/PersonaForm.jsx`
- `frontend/src/components/PersonasList.jsx`
- `frontend/src/components/EmptyState.jsx`
- `frontend/src/components/ErrorState.jsx`

### Grupo 4 - Estilos

Crear estilos para:

- layout principal
- formulario
- tabla/lista
- estados de feedback
- responsive mobile

## Archivos a tocar

- `backend/app/models/**`
- `backend/app/schemas/**`
- `backend/app/db/**`
- `backend/alembic/**`
- `frontend/src/pages/**`
- `frontend/src/components/**`
- `frontend/src/styles/**`

## Que NO hacer

- No crear endpoints de carga o consulta todavia.
- No conectar el frontend al backend todavia.
- No hardcodear `DATABASE_URL`.
- No versionar `.env` ni `.venv/`.
- No agregar campos fuera de `nombre`, `apellido`, `fecha_alta`.
- No agregar edicion ni borrado.
