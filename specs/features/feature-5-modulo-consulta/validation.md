# Validation - Modulo de consulta

| Criterio | Como verificar | Responsable | Pass/Fail |
|---|---|---|---|
| Endpoint `GET /personas` existe | Probar `GET /personas` | [AGENTE] | Pass |
| El endpoint devuelve lista JSON | Crear datos y verificar respuesta | [AGENTE] | Pass |
| El orden es correcto | Crear personas con distintas fechas y verificar orden por `fecha_alta` desc, `id` desc | [AGENTE] | Pass |
| Comandos backend usan entorno virtual | Activar `.venv` antes de ejecutar pruebas o comandos Python locales | [AGENTE] | Pass |
| Frontend usa URL de API desde `.env` | Verificar uso de `VITE_API_BASE_URL` | [AGENTE] | Pass |
| La UI muestra lista vacia correctamente | Abrir app sin datos | [HUMANO] | Pending |
| La UI muestra personas cargadas | Cargar persona y verificar que aparece en listado | [HUMANO] | Pending |
| La UI muestra error si falla API | Simular backend caido o error de red | [HUMANO] | Pending |
| No se agregaron funcionalidades fuera de scope | Revisar UI y diff | [HUMANO] | Pending |
