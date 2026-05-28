## Feature 9 - Pagina Principal con Menu de Navegacion - Cerrada âœ…
- Fecha: 2026-05-28
- Que se implemento: nueva pagina principal con topbar horizontal de 5 items (SUPA, WS, KGS, RAG, GRAL). SUPA despliega sub-items Carga y Consulta que contienen el contenido previo de PersonasPage. WS/KGS/RAG/GRAL muestran placeholder. App.jsx actualizado para renderizar HomePage. PersonasPage.jsx sin modificaciones.
- Decisiones tomadas fuera de la spec: navegacion implementada con estado local en HomePage (sin React Router), segun lo especificado.
- Resultado de validacion: checks AGENTE 4/4 pasaron. Checks HUMANO pendientes de revision manual en browser.
- Archivos modificados: frontend/src/App.jsx, frontend/src/components/TopBar.jsx (nuevo), frontend/src/pages/HomePage.jsx (nuevo), frontend/src/styles/global.css, specs/features/feature-9-pagina-principal-menu/.
## Feature 8 - Deploy Frontend en Vercel - Cerrada âœ…
- Fecha: 2026-05-26
- Que se implemento: conexion del frontend React + Vite a Vercel con deploy automatico desde rama `main`. Configuracion de `vercel.json` con framework Vite, build command, output directory y SPA routing. Especificacion de Node.js >= 22 en `package.json`. Resolucion de conflictos de merge en `PersonaForm.jsx` que bloqueaban el build.
- Decisiones tomadas fuera de la spec: se eligio Vercel plan Hobby por ser gratuito y soportar Vite nativamente. El preset fue configurado manualmente a Vite (Vercel lo detecto incorrectamente como Create React App).
- Resultado de validacion: build exitoso en Vercel. URL de produccion activa: `https://ejer-spec.vercel.app`.
- Archivos modificados: `frontend/vercel.json`, `frontend/package.json`, `frontend/src/components/PersonaForm.jsx`, `specs/tech-stack.md`, `specs/roadmap.md`.
- Pendiente: deploy del backend FastAPI y configurar `VITE_API_BASE_URL` en Vercel.

## Feature 6 - MVP - Cerrada
- Fecha: 2026-05-07
- Que se implemento: cierre del MVP con documentacion de uso, endpoints disponibles y validacion del flujo completo de carga y consulta de personas.
- Decisiones tomadas fuera de la spec: se mantuvo OpenTelemetry en modo base sin collector externo para respetar el alcance MVP.
- Resultado de validacion: checks AGENTE de MVP 6/6 pasaron; checks HUMANO de UI quedan pendientes para revision manual.
- Archivos modificados: `README.md`, `CHANGELOG.md`, `specs/features/feature-6-mvp/`.

## Feature 5 - Modulo de consulta - Cerrada
- Fecha: 2026-05-07
- Que se implemento: endpoint `GET /personas`, servicio de listado, cliente frontend `listPersonas` y listado UI con estados loading/error/vacio.
- Decisiones tomadas fuera de la spec: ninguna.
- Resultado de validacion: checks AGENTE 5/5 pasaron; checks HUMANO pendientes.
- Archivos modificados: `backend/app/api/personas.py`, `backend/app/services/personas.py`, `frontend/src/api/personas.js`, `frontend/src/components/PersonasList.jsx`, `frontend/src/pages/PersonasPage.jsx`, `specs/features/feature-5-modulo-consulta/validation.md`.

## Feature 4 - Modulo de carga - Cerrada
- Fecha: 2026-05-07
- Que se implemento: endpoint `POST /personas`, persistencia SQLite, cliente frontend `createPersona` y formulario funcional con validaciones.
- Decisiones tomadas fuera de la spec: se valido el backend con Uvicorn temporal y `urllib` de libreria estandar para evitar agregar dependencias de test.
- Resultado de validacion: checks AGENTE 6/6 pasaron; checks HUMANO pendientes.
- Archivos modificados: `backend/app/api/personas.py`, `backend/app/db/deps.py`, `backend/app/services/personas.py`, `backend/app/main.py`, `frontend/src/api/personas.js`, `frontend/src/components/PersonaForm.jsx`, `frontend/src/pages/PersonasPage.jsx`, `frontend/src/styles/global.css`, `specs/features/feature-4-modulo-carga/validation.md`.

## Feature 3 - Modelo de datos y diseno UI - Cerrada
- Fecha: 2026-05-07
- Que se implemento: modelo `persona`, schemas Pydantic, migracion Alembic inicial y UI base de carga/consulta.
- Decisiones tomadas fuera de la spec: se normalizo la ruta SQLite local para resolverla siempre contra `backend/`.
- Resultado de validacion: checks AGENTE 7/7 pasaron; checks HUMANO pendientes.
- Archivos modificados: `backend/app/models/`, `backend/app/schemas/`, `backend/alembic/`, `backend/app/core/config.py`, `backend/app/db/session.py`, `frontend/src/pages/`, `frontend/src/components/`, `frontend/src/styles/global.css`, `specs/features/feature-3-modelo-datos-ui/validation.md`.

## Feature 2 - Dependencias y configuracion - Cerrada
- Fecha: 2026-05-07
- Que se implemento: configuracion React + Vite, FastAPI, SQLite, Docker Compose, `.venv`, `.env.example`, OpenTelemetry base y README de ejecucion.
- Decisiones tomadas fuera de la spec: se agrego `backend/requirements.txt` para instalacion local/Docker mas simple y reproducible.
- Resultado de validacion: checks AGENTE principales pasaron; Docker/npm/Git tuvieron bloqueos locales de permisos/version documentados en validation.
- Archivos modificados: `frontend/`, `backend/`, `.env.example`, `.gitignore`, `docker-compose.yml`, `README.md`, `specs/features/feature-2-dependencias-configuracion/validation.md`.

## Feature 1 - Estructura del proyecto - Cerrada
- Fecha: 2026-05-07
- Que se implemento: estructura monorepo base para backend, frontend, Docker y documentacion.
- Decisiones tomadas fuera de la spec: ninguna.
- Resultado de validacion: checks AGENTE 4/4 pasaron; check HUMANO pendiente.
- Archivos modificados: `backend/`, `frontend/`, `README.md`, `.gitignore`, `docker-compose.yml`, `specs/features/feature-1-estructura/validation.md`.

