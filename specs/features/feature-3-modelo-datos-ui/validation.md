# Validation - Modelo de datos y diseno UI

| Criterio | Como verificar | Responsable | Pass/Fail |
|---|---|---|---|
| Existe modelo SQLAlchemy de persona | `Test-Path backend/app/models/persona.py` | [AGENTE] | Pass |
| Existe schema Pydantic de persona | `Test-Path backend/app/schemas/persona.py` | [AGENTE] | Pass |
| Existe migracion inicial | Verificar archivo en `backend/alembic/versions/` | [AGENTE] | Pass |
| La migracion crea tabla `personas` | Revisar migracion Alembic | [AGENTE] | Pass |
| Comandos backend usan entorno virtual | Activar `.venv` antes de ejecutar Alembic o Python local | [AGENTE] | Pass |
| Modelo/migracion usan configuracion central | Verificar que `DATABASE_URL` proviene de `.env`/variables y no esta hardcodeada | [AGENTE] | Pass |
| La UI base existe | `Test-Path frontend/src/pages/PersonasPage.jsx, frontend/src/components/PersonaForm.jsx, frontend/src/components/PersonasList.jsx` | [AGENTE] | Pass |
| La UI no incluye funcionalidades fuera de scope | Revisar pantalla y diff | [HUMANO] | Pending |
| La UI es usable en escritorio y mobile | Probar visualmente en navegador | [HUMANO] | Pending |
