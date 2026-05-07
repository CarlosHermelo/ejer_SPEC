# Feature 4 - Modulo de carga

## Objetivo

Permitir cargar personas con nombre, apellido y fecha de alta.

## Alcance

### Backend

- Crear endpoint para cargar una persona.
- Persistir la persona en SQLite.
- Validar datos de entrada.
- Devolver la persona creada.

### Frontend

- Crear formulario funcional de carga.
- Enviar datos al backend.
- Mostrar estado de carga.
- Mostrar errores de validacion.
- Limpiar formulario despues de una carga exitosa.

## Reglas de negocio

- `nombre` es obligatorio.
- `apellido` es obligatorio.
- `fecha_alta` es obligatoria.
- `fecha_alta` no puede ser futura.
- No se valida unicidad por nombre/apellido en el MVP.
- No se pide DNI ni email.

## Fuera de scope

- Login.
- Permisos.
- Edicion de personas.
- Borrado de personas.
- Importacion masiva.
- Adjuntar documentos.
- Asignar tareas.
- Registrar pagos.

## Decisiones tomadas

- El endpoint usara `POST /personas`.
- La respuesta exitosa devolvera HTTP 201.
- Los errores de validacion devolveran HTTP 422.
- El frontend no debe ocultar errores tecnicos; debe mostrarlos de forma comprensible.
