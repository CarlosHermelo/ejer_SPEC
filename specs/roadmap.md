# Roadmap

## Fases

1. Configurar carpetas y estructura del proyecto
2. Definir dependencias y configuracion
3. Crear modelo de datos y disenar UI
4. Crear modulo de carga de personas
5. Crear modulo de consulta de personas
6. Cerrar MVP

## Dependencias entre fases

- La estructura del proyecto debe existir antes de configurar dependencias.
- Las dependencias y configuracion deben existir antes de implementar modelo de datos, UI y modulos.
- El modelo de datos debe estar definido antes de implementar carga y consulta.
- El modulo de consulta depende de que existan datos cargados.
- El MVP depende de validar todas las fases anteriores.
- Cada feature debe pasar por spec aprobada, implementacion, validacion agente/humano, push, PR y merge.

## Orden de features

### Feature 1 - Estructura del proyecto

Crear la estructura base monorepo con carpetas para frontend React + Vite, backend FastAPI por capas simples, configuracion, Docker Compose y documentacion del proyecto.

### Feature 2 - Dependencias y configuracion

Configurar dependencias de React, Vite, FastAPI, SQLAlchemy, Alembic, SQLite, Docker Compose, GitHub y OpenTelemetry.

### Feature 3 - Modelo de datos y diseno UI

Definir el modelo `persona` y el diseno inicial de la interfaz para carga y consulta.

### Feature 4 - Modulo de carga

Implementar la carga de personas con nombre, apellido y fecha de alta.

### Feature 5 - Modulo de consulta

Implementar la consulta/listado de personas cargadas.

### Feature 6 - MVP

Validar el flujo completo, documentar uso y cerrar el MVP.

### Feature 7 - Envio de mensajes a WhatsApp

Script Python standalone que envia un mensaje de texto al numero personal del usuario via Kapso (wrapper de Meta WhatsApp Cloud API), ejecutable desde linea de comandos. Fuera del scope: recepcion, grabacion en markdown, integracion con frontend.

### Feature 8 - Deploy Frontend en Vercel ✅

Conectar el frontend React + Vite a Vercel para tener una URL publica de produccion.
Completada: 2026-05-26.
URL resultante: `https://ejer-spec.vercel.app`
Pendiente: deploy del backend FastAPI (Railway o Render) y configurar `VITE_API_BASE_URL` en Vercel.
