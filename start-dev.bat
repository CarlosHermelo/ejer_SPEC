@echo off
echo Levantando entorno de desarrollo...
start "Backend - FastAPI" cmd /k "%~dp0start-backend.bat"
timeout /t 3 /nobreak >/dev/null
start "Frontend - Vite" cmd /k "%~dp0start-frontend.bat"
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
