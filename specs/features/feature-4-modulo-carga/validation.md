# Validation - Modulo de carga

| Criterio | Como verificar | Responsable | Pass/Fail |
|---|---|---|---|
| Endpoint `POST /personas` existe | Probar `POST /personas` con payload valido | [AGENTE] | Pending |
| Persona valida se persiste | Crear persona y verificar registro en SQLite | [AGENTE] | Pending |
| Payload incompleto falla | Probar sin `nombre`, sin `apellido` y sin `fecha_alta` | [AGENTE] | Pending |
| Fecha futura falla | Probar `fecha_alta` futura y esperar error 422 | [AGENTE] | Pending |
| Comandos backend usan entorno virtual | Activar `.venv` antes de ejecutar pruebas o comandos Python locales | [AGENTE] | Pending |
| Frontend usa URL de API desde `.env` | Verificar uso de `VITE_API_BASE_URL` | [AGENTE] | Pending |
| Formulario permite cargar persona | Probar desde navegador | [HUMANO] | Pending |
| Formulario muestra errores claros | Probar campos vacios y fecha futura | [HUMANO] | Pending |
| No se agregaron campos fuera de scope | Revisar UI y diff | [HUMANO] | Pending |
