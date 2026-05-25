# Feature 6 - MVP

## Objetivo

Validar el flujo completo del MVP, documentar uso y cerrar el alcance definido en el roadmap.

## Alcance

- Validar backend de salud, carga y consulta.
- Validar persistencia SQLite.
- Validar que el listado respeta el orden definido.
- Documentar ejecucion local y con Docker Compose.
- Documentar endpoints disponibles.
- Actualizar `CHANGELOG.md`.

## Reglas

- No agregar funcionalidades nuevas.
- No agregar campos nuevos a `persona`.
- No agregar login, permisos, pagos, tareas ni documentos.
- No agregar busqueda, filtros, paginacion, edicion ni borrado.

## Fuera de scope

- Deploy.
- CI/CD.
- Pull Request automatico.
- Observability con collector externo.
- Tests automatizados formales.

## Decisiones tomadas

- El MVP se considera cerrado si el backend permite crear y listar personas con `nombre`, `apellido` y `fecha_alta`.
- La validacion visual del frontend queda como check humano.
