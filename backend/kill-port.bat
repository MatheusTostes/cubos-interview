@echo off
netstat -ano | findstr :8080 >nul 2>&1
if %errorlevel% == 0 (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do taskkill /F /PID %%a >nul 2>&1
)

