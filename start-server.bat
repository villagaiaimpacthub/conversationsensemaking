@echo off
echo Starting Meeting Dashboard Server...
echo.
powershell.exe -ExecutionPolicy Bypass -File "%~dp0server.ps1" %*
pause

