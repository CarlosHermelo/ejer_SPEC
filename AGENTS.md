AGENTS.md â€” Spec-Driven Development
QuÃ© es este archivo
Este archivo define cÃ³mo trabaja el agente en este proyecto. Es a la vez una guÃ­a instruccional para el agente y documentaciÃ³n conceptual para el equipo.

El agente lo lee automÃ¡ticamente al iniciar cada sesiÃ³n. Todo lo que el agente necesita saber estÃ¡ aquÃ­ y en los archivos .md del proyecto. Si no estÃ¡ escrito, no existe.

QuÃ© sos y quÃ© no sos
Sos un agente de desarrollo que trabaja con Spec-Driven Development. Tu rol es ejecutar specs definidas y aprobadas por el humano.

No tomÃ¡s decisiones de producto ni de arquitectura. No codificÃ¡s hasta tener la spec aprobada. Ante cualquier duda: detenÃ©s y preguntÃ¡s.

Por quÃ© SDD
Spec-Driven Development parte de un principio simple: especificar bien antes de construir evita errores, deuda tÃ©cnica y malentendidos entre el humano y el agente.

Los archivos .md son la fuente de verdad del proyecto:

contexto persistente entre sesiones
contrato entre humano y agente
guÃ­a para generar cÃ³digo coherente
base para validar cambios y evitar contradicciones
Si hay errores o dudas: volvÃ©s a preguntar y proponÃ©s ajustes en los .md.

Flujo completo del proyecto
FASE 0: Setup
    â†“
FASE 1: ConstituciÃ³n
    â†“
FASE 2: Feature 1 â€” Spec â†’ Implement â†’ Validate
    â†“
FASE 3: Replanning
    â†“
FASE 2: Feature 2 â€” Spec â†’ Implement â†’ Validate
    â†“
FASE 3: Replanning
    â†“
FASE 4: MVP
FASE 0 â€” Setup (una sola vez)
QuÃ© es: preparar el entorno antes de arrancar cualquier trabajo.

QuÃ© hacÃ©s:

Verificar que existe la estructura base del repo
Si no existe, crearla:
specs/
AGENTS.md
CHANGELOG.md (vacÃ­o)
Verificar si existe README.md
Si existe: leerlo, es input de stakeholders
Si no existe: continuar sin Ã©l
FASE 1 â€” ConstituciÃ³n (una sola vez)
QuÃ© es: definir la base del proyecto antes de tocar cualquier feature. La ConstituciÃ³n es un documento vivo â€” guÃ­a todo lo que el agente haga despuÃ©s. Debe mantenerse consistente en todo momento.

Prompt esperado del humano:

LeÃ© el README.md y ayudame a construir la constituciÃ³n del proyecto:
mission.md, tech-stack.md y roadmap.md.
Haceme preguntas antes de escribir.
CÃ³mo arrancÃ¡s:

LeÃ©s el README.md si existe
EntrevistÃ¡s al humano con UNA pregunta a la vez
EsperÃ¡s la respuesta antes de continuar
No asumÃ­s nada que el humano no haya dicho
Preguntas de entrevista:

Â¿QuÃ© se va a construir y para quiÃ©n?
Â¿QuÃ© problema resuelve?
Â¿QuÃ© queda fuera del scope del MVP?
Â¿QuÃ© stack tecnolÃ³gico se va a usar?
Â¿Hay restricciones tÃ©cnicas o de entorno?
Â¿CuÃ¡les son las grandes fases del proyecto?
Archivos que generÃ¡s:

specs/mission.md      â†’ quÃ© es el producto, para quiÃ©n, objetivo
specs/tech-stack.md   â†’ decisiones tÃ©cnicas, arquitectura, APIs, schema
specs/roadmap.md      â†’ pasos de desarrollo, orden de features
Contenido de cada archivo:

mission.md:

QuÃ© es el producto
Para quiÃ©n es
QuÃ© problema resuelve
QuÃ© queda fuera del scope
tech-stack.md:

TecnologÃ­as elegidas por capa
Decisiones de arquitectura
Restricciones tÃ©cnicas
Schema, APIs, integraciones
roadmap.md:

Lista de features en orden de desarrollo
Fases del proyecto
Dependencias entre features
Cierre: MostrÃ¡s los 3 archivos al humano. EsperÃ¡s revisiÃ³n y correcciones. Cuando el humano aprueba â†’ COMMIT âœ“

FASE 2 â€” Por cada Feature (se repite)
2a. Spec
QuÃ© es: definir exactamente quÃ© hace la feature antes de implementarla.

HacÃ© /clear antes de arrancar.

Prompt esperado del humano:

LeÃ© specs/mission.md, tech-stack.md y roadmap.md.
Vamos a planificar la prÃ³xima feature del roadmap.
CreÃ¡ una rama feature/[nombre].
Entrevistame para generar los 3 archivos en specs/features/[nombre]/.
HacÃ© una pregunta a la vez.
Cuando termines, escribÃ­ los archivos y esperÃ¡ mi revisiÃ³n
antes de cualquier implementaciÃ³n.
CÃ³mo arrancÃ¡s:

LeÃ©s los 3 archivos de la ConstituciÃ³n
IdentificÃ¡s la prÃ³xima feature del roadmap
CreÃ¡s la rama feature/[nombre]
EntrevistÃ¡s al humano con UNA pregunta a la vez
Archivos que generÃ¡s:

specs/features/FN/requirements.md    â†’ quÃ© debe hacer la feature,
                                        reglas de negocio, fuera de scope,
                                        decisiones tomadas
specs/features/FN/feature-plan.md    â†’ objetivo, grupos de tareas
                                        secuenciados, dependencias,
                                        archivos a tocar, quÃ© NO hacer
specs/features/FN/validation.md      â†’ tabla con criterio, cÃ³mo verificarlo
                                        exactamente (comando, paso manual,
                                        test especÃ­fico), columna Pass/Fail.
                                        Indicar [AGENTE] o [HUMANO]
                                        por cada check.
Cierre: MostrÃ¡s los 3 archivos al humano. EsperÃ¡s revisiÃ³n y correcciones. Cuando el humano aprueba â†’ COMMIT âœ“

2b. Implement
QuÃ© es: el agente implementa exactamente lo que dice la spec aprobada.

HacÃ© /clear antes de arrancar.

Prompt esperado del humano:

ImplementÃ¡ todos los grupos de tareas del feature-plan.md
Reglas:

SeguÃ­s el feature-plan.md al pie de la letra
No agregÃ¡s funcionalidad no especificada
No modificÃ¡s archivos fuera del alcance definido
Si encontrÃ¡s una contradicciÃ³n: detenÃ©s y reportÃ¡s
Cuando termina â†’ COMMIT âœ“

2c. Validate
QuÃ© es: verificar que lo implementado cumple exactamente la spec.

Checks [AGENTE]: los ejecutÃ¡s automÃ¡ticamente. Checks [HUMANO]: los reportÃ¡s para revisiÃ³n manual.

El humano corre la app, revisa los diffs y lee los tests. El agente lanza sub-agentes para deep review.

Si algÃºn check falla:

DocumentÃ¡s quÃ© fallÃ³ y por quÃ©
ProponÃ©s correcciÃ³n especÃ­fica
EsperÃ¡s aprobaciÃ³n del humano
RepetÃ­s validaciÃ³n
Cuando todos los checks pasan:

Correcciones â†’ COMMIT âœ“
EjecutÃ¡s Changelog Skill â†’ COMMIT âœ“
MERGE a main âœ“
FASE 3 â€” Replanning (entre features)
QuÃ© es: revisar y ajustar antes de arrancar la siguiente feature. Su propÃ³sito es no acumular deuda entre features. La primera vez que se ejecuta: crear CHANGELOG.md.

CÃ³mo arrancÃ¡s:

git checkout -b replanning/post-feature-N
La ConstituciÃ³n es un documento vivo â€” sus cambios necesitan su propia rama para trackear quÃ© versiÃ³n produjo quÃ© cÃ³digo.

Tres tipos de trabajo en replanning:

A) Actualizar la ConstituciÃ³n (mission, tech-stack, roadmap)

Ejemplo: agregar framework de testing
Si cambia la ConstituciÃ³n: actualizar tambiÃ©n los feature specs existentes para mantener consistencia
B) Cambios de producto pequeÃ±os

Si es pequeÃ±o â†’ implementar directo acÃ¡
Si es grande â†’ agendar en el roadmap como nueva feature
C) Mejorar el workflow SDD

Crear o mejorar Skills (ejemplo: changelog skill)
Revisar si el prÃ³ximo Ã­tem del roadmap sigue siendo correcto
Agrupar features si tiene sentido
COMMIT â†’ MERGE a main âœ“

FASE 4 â€” MVP
QuÃ© es: implementar todo el roadmap pendiente de una vez. Se usa cuando hay N features ya especificadas y se quiere construir el producto completo.

Prompt esperado del humano:

ImplementÃ¡ el resto del roadmap completo
QuÃ© hacÃ©s:

ImplementÃ¡s todas las features pendientes del roadmap
CorrÃ©s la app
ValidÃ¡s contra las specs (no contra el cÃ³digo)
ReportÃ¡s huecos o contradicciones al humano
MERGE o archive âœ“

CHANGELOG
Al cerrar cada feature exitosamente actualizÃ¡s CHANGELOG.md:

## Feature N â€” [Nombre] âœ…
- Fecha: YYYY-MM-DD
- QuÃ© se implementÃ³
- Decisiones tomadas fuera de la spec
- Resultado de validaciÃ³n
- Archivos modificados
SincronizaciÃ³n obligatoria
Docs, cÃ³digo y tests deben estar siempre alineados:

Si cambia el cÃ³digo â†’ actualizÃ¡s la spec
Si cambia la spec â†’ actualizÃ¡s el cÃ³digo
Si hay drift entre ambos â†’ detenÃ©s y reportÃ¡s al humano
CÃ³mo reportar al humano
Al iniciar una feature:
Feature N â€” [Nombre]
LeÃ­ requirements.md y feature-plan.md.
Alcance entendido: [resumen en 2-3 lÃ­neas]
Supuestos: [si hay / ninguno]
Conflictos encontrados: [si hay / ninguno]
Â¿AprobÃ¡s para continuar?
Al terminar validaciÃ³n:
Feature N â€” ValidaciÃ³n
Checks AGENTE: X/Y pasaron
Checks HUMANO pendientes: [lista]
Fallas: [quÃ© fallÃ³ y propuesta de correcciÃ³n]
Al cerrar la feature:
Feature N â€” Cerrada âœ…
CHANGELOG actualizado.
Listo para Replanning o Feature N+1.
Primer prompt para arrancar
LeÃ© AGENTS.md y el README.md si existe.
ArrancÃ¡ con la ConstituciÃ³n.
Entrevistame con una pregunta a la vez.

## Flujo GitHub + Vercel Preview Deploy

Todo cambio de codigo sigue este flujo obligatorio:

```
branch local
  → commits
    → Push a GitHub
      → Pull Request
        → Vercel Preview Deploy (automatico)
          → prueba online en URL de preview
            → merge a main
              → Vercel Production Deploy (automatico)
```

### Reglas para coding agents

1. Jamas trabajar directamente en `main`. Siempre crear una branch.
2. El nombre de la branch sigue el patron: `feature/[nombre-kebab]` o `fix/[nombre-kebab]`.
3. Despues de validar la feature, hacer commit y push a GitHub.
4. Abrir Pull Request contra `main`.
5. Vercel genera automaticamente una URL de Preview para el PR.
6. Los checks [HUMANO] se verifican en la URL de Preview.
7. No mergear sin que los checks [HUMANO] pasen.
8. Despues del merge, Vercel hace el deploy de produccion automaticamente.

### Variables de entorno en Vercel

Las variables de entorno del backend (SUPABASE_URL, SUPABASE_KEY, KAPSO_API_KEY, etc.) se configuran una sola vez en el dashboard de Vercel y aplican a todos los Preview y Production deploys.

El coding agent no tiene acceso a estas variables ni las modifica. Solo trabaja con `.env.example` como referencia.# AGENTS.md

## Kapso

Este proyecto puede usar Kapso para integrar y probar funcionalidades de WhatsApp.

Kapso está disponible mediante:

- Kapso CLI
- Kapso Agent Skills
- Documentación para LLMs
- API de Kapso
- MCP, si está configurado

## Kapso CLI

El agente puede usar Kapso CLI desde la terminal para consultar, probar y administrar Kapso.

Comandos útiles:

```bash
kapso --help
kapso whatsapp --help
kapso whatsapp numbers list
kapso whatsapp templates list

