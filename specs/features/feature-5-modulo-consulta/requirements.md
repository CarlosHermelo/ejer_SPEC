# Feature 5 - Modulo de consulta

## Objetivo

Permitir consultar las personas cargadas en el sistema.

## Alcance

### Backend

- Crear endpoint para listar personas.
- Devolver personas ordenadas de forma consistente.
- Incluir `id`, `nombre`, `apellido` y `fecha_alta`.

### Frontend

- Mostrar listado de personas.
- Mostrar estados de carga, error y lista vacia.
- Refrescar el listado despues de cargar una persona.

## Reglas de negocio

- El listado debe mostrar todas las personas cargadas.
- El orden inicial sera por `fecha_alta` descendente y luego `id` descendente.
- No hay filtros ni busqueda en el MVP.
- No hay paginacion en el MVP.

## Fuera de scope

- Busqueda por texto.
- Filtros.
- Paginacion.
- Orden configurable.
- Detalle individual.
- Edicion.
- Borrado.
- Exportacion.

## Decisiones tomadas

- El endpoint usara `GET /personas`.
- La respuesta sera una lista JSON.
- La UI mostrara una tabla en escritorio y un layout responsive simple en mobile si la tabla no entra comodamente.
