# Validation - Dependencias y configuracion

| Criterio | Como verificar | Responsable | Pass/Fail |
|---|---|---|---|
| Frontend tiene configuracion Vite | `Test-Path frontend/package.json, frontend/index.html, frontend/src/main.jsx` | [AGENTE] | Pass |
| Backend tiene configuracion FastAPI | `Test-Path backend/pyproject.toml, backend/app/main.py` | [AGENTE] | Pass |
| Entorno virtual local existe | `Test-Path .venv` | [AGENTE] | Pass |
| `.venv` esta ignorado por Git | Revisar `.gitignore` | [AGENTE] | Pass |
| `.env.example` existe | `Test-Path .env.example` | [AGENTE] | Pass |
| `.env` existe localmente | `Test-Path .env` | [AGENTE] | Pass |
| `.env` esta ignorado por Git | Revisar `.gitignore` | [AGENTE] | Pass |
| Docker Compose define frontend y backend | `docker compose config` | [AGENTE] | Pass |
| Backend inicia sin errores | `docker compose up backend` y revisar salida | [AGENTE] | Fail - bloqueado por permisos Docker en `C:\Users\u14527001\.docker\config.json` |
| Frontend inicia sin errores | `docker compose up frontend` y revisar salida | [AGENTE] | Fail - Docker bloqueado; npm local tambien falla por permisos/Node local `20.16.0` |
| Remoto GitHub configurado | `git remote get-url origin` debe devolver `https://github.com/CarlosHermelo/ejer_SPEC` | [AGENTE] | Fail - `.git/config` bloqueado por permisos |
| README documenta comandos base | Revisar `README.md` | [HUMANO] | Pending |
| README documenta activacion de `.venv` y uso de `.env` | Revisar `README.md` | [HUMANO] | Pending |
| README documenta remoto y PR cuando corresponda | Revisar `README.md` | [HUMANO] | Pending |
| No hay funcionalidad de personas agregada | Revisar diff | [HUMANO] | Pending |
