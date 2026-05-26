# Validation - MVP

| Criterio | Como verificar | Responsable | Pass/Fail |
|---|---|---|---|
| Healthcheck responde | `GET /health` | [AGENTE] | Pass |
| Carga de persona funciona | `POST /personas` con payload valido | [AGENTE] | Pass |
| Consulta de personas funciona | `GET /personas` devuelve lista JSON | [AGENTE] | Pass |
| Persistencia SQLite funciona | Crear persona y verificar que aparece en consulta posterior | [AGENTE] | Pass |
| Orden de consulta es correcto | Verificar `fecha_alta` desc y `id` desc | [AGENTE] | Pass |
| Payload invalido devuelve 422 | Probar campos faltantes y fecha futura | [AGENTE] | Pass |
| README documenta uso del MVP | Revisar `README.md` | [HUMANO] | Pending |
| UI permite cargar y listar persona | Probar en navegador | [HUMANO] | Pending |
| UI muestra errores de formulario | Probar campos vacios y fecha futura | [HUMANO] | Pending |
| UI es responsive basica | Probar desktop/mobile | [HUMANO] | Pending |
