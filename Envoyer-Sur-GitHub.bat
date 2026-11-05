@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================================
echo   Envoi du projet CHRONIQUE vers GitHub (ModouBNiang/Chronique-edition-1)
echo ============================================================================
echo.
echo Si une fenetre GitHub s'ouvre, cliquez sur "Sign in with your browser".
echo.
git push -u origin main
echo.
pause
