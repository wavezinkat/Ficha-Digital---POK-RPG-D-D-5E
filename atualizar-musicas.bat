@echo off
rem Atualiza a lista de musicas e papeis de parede (dois cliques neste arquivo).
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0atualizar-musicas.ps1"
pause
