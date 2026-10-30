@echo off
title Online Learning Platform - Frontend (React JS)
echo ========================================================
echo Starting Online Learning Platform Frontend (React JS)...
echo Port: 3000
echo ========================================================
if exist "%~dp0online-learning-platform\frontend" (
    cd /d "%~dp0online-learning-platform\frontend"
) else (
    cd /d "%~dp0frontend"
)
if not exist node_modules (
    echo node_modules not detected. Installing dependencies...
    npm install
)
npm run dev
pause
