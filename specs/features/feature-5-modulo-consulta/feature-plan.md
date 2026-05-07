# Feature Plan - Modulo de consulta

## Objetivo

Implementar el flujo completo para listar personas cargadas desde SQLite en la UI.

## Grupos de tareas

### Grupo 1 - Backend API

Antes de ejecutar comandos backend locales, activar el entorno virtual definido en Feature 2:

- Windows PowerShell: `.\\.venv\\Scripts\\Activate.ps1`
- Linux/macOS: `source .venv/bin/activate`

Actualizar:

- `backend/app/api/personas.py`
- `backend/app/services/personas.py`

Endpoint:

- `GET /personas`

Comportamiento:

- Consulta tabla `personas`.
- Ordena por `fecha_alta` descendente y luego `id` descendente.
- Devuelve lista de personas.

### Grupo 2 - Frontend API client

Actualizar:

- `frontend/src/api/personas.js`

Funcion:

- `listPersonas()`

La URL base de API debe salir de configuracion (`VITE_API_BASE_URL`) definida en `.env`, no quedar hardcodeada.

### Grupo 3 - Listado UI

Actualizar:

- `frontend/src/components/PersonasList.jsx`
- `frontend/src/pages/PersonasPage.jsx`

Comportamiento:

- Cargar listado al abrir la pantalla.
- Mostrar loading mientras consulta.
- Mostrar empty state si no hay personas.
- Mostrar error si falla la API.
- Refrescar listado despues de crear una persona.

### Grupo 4 - Presentacion responsive

Mostrar columnas:

- Nombre
- Apellido
- Fecha de alta

La interfaz debe mantenerse legible en mobile.

## Archivos a tocar

- `backend/app/api/personas.py`
- `backend/app/services/personas.py`
- `frontend/src/api/personas.js`
- `frontend/src/components/PersonasList.jsx`
- `frontend/src/pages/PersonasPage.jsx`
- `frontend/src/components/EmptyState.jsx`
- `frontend/src/components/ErrorState.jsx`
- `frontend/src/styles/**`

## Que NO hacer

- No agregar busqueda.
- No agregar filtros.
- No agregar paginacion.
- No hardcodear URLs de API ni rutas de base de datos.
- No versionar `.env` ni `.venv/`.
- No agregar edicion ni borrado.
- No agregar campos nuevos.
