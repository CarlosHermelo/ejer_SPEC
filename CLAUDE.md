# CLAUDE.md

Las instrucciones de trabajo SDD están en [AGENTS.md](AGENTS.md). Leé ese archivo al iniciar cada sesión.

---

## Advertencia de entorno

El nombre de usuario en este sistema es `u14527001`. La ruta absoluta del proyecto es `C:\Usersᑒ7001\Downloads\analista\eje3_codex`.

**NUNCA uses rutas absolutas hardcodeadas** — el contexto puede mostrar el path con caracteres corruptos (`ᑒ7001` en lugar de `u14527001`). Siempre usá rutas relativas o `$PWD` / `pwd` para construir paths.

---

## Flujo GitHub + Vercel Preview Deploy

Todo cambio de código sigue este flujo obligatorio:

```
branch local
  → commits
    → Push a GitHub
      → Pull Request
        → Vercel Preview Deploy (automático)
          → prueba online en URL de preview
            → merge a main
              → Vercel Production Deploy (automático)
```

### Reglas para coding agents

1. Jamás trabajar directamente en `main`. Siempre crear una branch.
2. El nombre de la branch sigue el patrón: `feature/[nombre-kebab]` o `fix/[nombre-kebab]`.
3. Después de validar la feature, hacer commit y push a GitHub.
4. Abrir Pull Request contra `main`.
5. Vercel genera automáticamente una URL de Preview para el PR.
6. Los checks [HUMANO] se verifican en la URL de Preview.
7. No mergear sin que los checks [HUMANO] pasen.
8. Después del merge, Vercel hace el deploy de producción automáticamente.

### Variables de entorno en Vercel

Las variables de entorno del backend (SUPABASE_URL, SUPABASE_KEY, KAPSO_API_KEY, etc.) se configuran una sola vez en el dashboard de Vercel y aplican a todos los Preview y Production deploys.

El coding agent no tiene acceso a estas variables ni las modifica. Solo trabaja con `.env.example` como referencia.