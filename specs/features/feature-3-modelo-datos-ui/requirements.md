# Feature 3 - Modelo de datos y diseno UI

## Objetivo

Definir el modelo de datos `persona` y el diseno inicial de la interfaz para cargar y consultar personas.

## Alcance

### Modelo de datos

Entidad `persona`:

- `id`: identificador unico autoincremental.
- `nombre`: texto obligatorio.
- `apellido`: texto obligatorio.
- `fecha_alta`: fecha obligatoria.

### Validaciones de datos

- `nombre` no puede estar vacio.
- `apellido` no puede estar vacio.
- `fecha_alta` debe ser una fecha valida.
- `fecha_alta` no puede ser futura.

### UI

La UI debe tener una experiencia simple y directa:

- Vista principal de personas.
- Area de carga de persona.
- Area de consulta/listado de personas.
- Estados basicos:
  - cargando
  - error
  - lista vacia
  - datos cargados

## Reglas

- El diseno debe priorizar claridad y uso interno.
- No debe parecer landing page.
- No debe incluir login ni permisos.
- No debe incluir pagos, tareas ni documentos.
- La UI debe ser responsive para escritorio y mobile.

## Fuera de scope

- Crear personas desde backend o frontend.
- Consultar personas desde backend o frontend.
- Busqueda avanzada.
- Edicion o borrado.
- Paginacion.
- Importacion/exportacion.

## Decisiones tomadas

- La pantalla principal sera una herramienta operativa, no una pagina comercial.
- La fecha de alta sera ingresada como fecha, no como texto libre.
- No se agregan campos extra al modelo durante el MVP.
