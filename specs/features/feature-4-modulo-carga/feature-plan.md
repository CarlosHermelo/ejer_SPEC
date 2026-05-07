# Feature Plan - Modulo de carga

## Objetivo

Implementar el flujo completo para crear personas desde la UI y persistirlas en SQLite.

## Grupos de tareas

### Grupo 1 - Backend API

Antes de ejecutar comandos backend locales, activar el entorno virtual definido en Feature 2:

- Windows PowerShell: `.\\.venv\\Scripts\\Activate.ps1`
- Linux/macOS: `source .venv/bin/activate`

Crear o actualizar:

- `backend/app/api/personas.py`
- registro de router en `backend/app/main.py`
- servicio en `backend/app/services/personas.py`

Endpoint:

- `POST /personas`

Comportamiento:

- Recibe `nombre`, `apellido`, `fecha_alta`.
- Valida datos con schema Pydantic.
- Persiste con SQLAlchemy.
- Devuelve persona creada.

### Grupo 2 - Frontend API client

Crear o actualizar:

- `frontend/src/api/personas.js`

Funcion:

- `createPersona(payload)`

La URL base de API debe salir de configuracion (`VITE_API_BASE_URL`) definida en `.env`, no quedar hardcodeada.

### Grupo 3 - Formulario

Actualizar:

- `frontend/src/components/PersonaForm.jsx`
- `frontend/src/pages/PersonasPage.jsx`

Comportamiento:

- Inputs para nombre, apellido y fecha de alta.
- Boton de guardar.
- Estado loading mientras guarda.
- Mensaje de exito.
- Mensaje de error.
- Limpieza del formulario al guardar correctamente.

### Grupo 4 - Validaciones visuales

Mostrar errores si:

- nombre esta vacio
- apellido esta vacio
- fecha alta esta vacia
- fecha alta es futura

## Archivos a tocar

- `backend/app/api/**`
- `backend/app/services/**`
- `backend/app/schemas/**`
- `backend/app/main.py`
- `frontend/src/api/**`
- `frontend/src/components/PersonaForm.jsx`
- `frontend/src/pages/PersonasPage.jsx`
- `frontend/src/styles/**`

## Que NO hacer

- No implementar consulta/listado final en esta feature.
- No hardcodear URLs de API ni rutas de base de datos.
- No versionar `.env` ni `.venv/`.
- No agregar edicion.
- No agregar borrado.
- No agregar autenticacion.
- No agregar campos nuevos.
