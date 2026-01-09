@echo off
setlocal
REM Simple launcher for Windows.
REM Runs the PowerShell deployment script from this folder.

cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy-ovh-ftp.ps1" %*
