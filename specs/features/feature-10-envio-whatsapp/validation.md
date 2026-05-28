# Validation — Feature 10: Envío de mensaje WhatsApp

| # | Criterio | Cómo verificarlo | Responsable | Pass/Fail |
|---|----------|-----------------|-------------|-----------|
| 1 | El endpoint `POST /whatsapp/send` existe y responde | `curl -X POST http://localhost:8000/whatsapp/send -H "Content-Type: application/json" -d '{"message":"test"}' ` → respuesta 200 con `{"status":"ok"}` | [AGENTE] | |
| 2 | El endpoint rechaza body vacío o sin campo `message` | `curl -X POST http://localhost:8000/whatsapp/send -H "Content-Type: application/json" -d '{}'` → respuesta 422 | [AGENTE] | |
| 3 | Las variables de entorno Kapso están en `Settings` | Leer `backend/app/core/config.py` y verificar que `KAPSO_API_KEY`, `PHONE_NUMBER_ID`, `NUMERO_DESTINO` están declaradas | [AGENTE] | |
| 4 | `.env.example` documenta las 3 variables Kapso | Leer `.env.example` y verificar presencia de `KAPSO_API_KEY`, `PHONE_NUMBER_ID`, `NUMERO_DESTINO` | [AGENTE] | |
| 5 | La ruta `/whatsapp` existe en el frontend | Leer `frontend/src/App.jsx` y verificar que existe `<Route path="/whatsapp" ...>` | [AGENTE] | |
| 6 | El menú tiene la entrada "WS" con submenú "Msj1" | Navegar a la app en el browser, hacer click en "WS" y verificar que aparece el ítem "Msj1" en el submenú | [HUMANO] | |
| 6b | Al hacer click en "Msj1" se navega a la página de envío | Hacer click en "Msj1" y verificar que la URL cambia a `/whatsapp` y se muestra la página de envío | [HUMANO] | |
| 7 | El campo de texto y el botón "Enviar" aparecen en `/whatsapp` | Navegar a `/whatsapp` en el browser | [HUMANO] | |
| 8 | El botón queda deshabilitado si el campo está vacío | Abrir `/whatsapp`, dejar el campo vacío y verificar que el botón no es clickeable | [HUMANO] | |
| 9 | Se muestra feedback de éxito tras envío exitoso | Escribir un mensaje, presionar "Enviar" y verificar que aparece texto de confirmación en verde | [HUMANO] | |
| 10 | Se muestra feedback de error si Kapso falla | Configurar `KAPSO_API_KEY` con valor inválido en `.env` local, enviar mensaje y verificar que aparece texto de error visible | [HUMANO] | |
| 11 | El botón se deshabilita durante el envío (estado de carga) | Presionar "Enviar" y verificar que el botón queda deshabilitado hasta recibir respuesta | [HUMANO] | |
| 12 | Las credenciales Kapso no están hardcodeadas en el código | Revisar `whatsapp_service.py` y confirmar que usa `os.environ` o `Settings` | [AGENTE] | |
