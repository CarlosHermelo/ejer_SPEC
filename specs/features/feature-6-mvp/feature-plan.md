# Feature Plan - MVP

## Objetivo

Cerrar el MVP documentando uso y validando el flujo implementado.

## Grupos de tareas

### Grupo 1 - Documentacion

Actualizar `README.md` con:

- alcance del MVP
- endpoints disponibles
- pasos de ejecucion local
- pasos de ejecucion Docker
- notas de observability
- funcionalidades fuera de scope

### Grupo 2 - Validacion backend

Validar con `.venv`:

- `GET /health`
- `POST /personas`
- `GET /personas`
- persistencia en SQLite
- orden por `fecha_alta` descendente y `id` descendente
- errores 422 para payload invalido

### Grupo 3 - Validacion frontend

Dejar checks humanos para:

- abrir la UI
- cargar persona
- ver persona en listado
- ver errores de formulario
- confirmar responsive basico

### Grupo 4 - Changelog

Actualizar `CHANGELOG.md` con el cierre del MVP.

## Archivos a tocar

- `README.md`
- `CHANGELOG.md`
- `specs/features/feature-6-mvp/**`

## Que NO hacer

- No modificar comportamiento de carga o consulta salvo correccion requerida por validacion.
- No agregar endpoints nuevos.
- No agregar componentes nuevos.
- No agregar dependencias.
