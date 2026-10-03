@echo off
title Netcoder Laravel LMS Backend & REST API Server (Port 8000)
color 0A
echo =====================================================================
echo    Netcoder Technology - Laravel LMS Backend & Admin Server
echo =====================================================================
echo [INFO] Starting Live PHP Backend Server on http://127.0.0.1:8000 ...
echo [INFO] Admin Dashboard available at: http://127.0.0.1:8000/admin
echo [INFO] REST API for Next.js available at: http://127.0.0.1:8000/api
echo.
echo Press Ctrl+C anytime to stop the server.
echo =====================================================================
php -S 127.0.0.1:8000 server.php
pause
