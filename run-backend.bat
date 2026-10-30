@echo off
title Online Learning Platform - Backend (Spring Boot)
echo ========================================================
echo Starting Online Learning Platform Backend (Spring Boot)...
echo Port: 8080
echo Database: MySQL (online_learning_platform)
echo ========================================================
if exist "%~dp0online-learning-platform\backend" (
    cd /d "%~dp0online-learning-platform\backend"
) else (
    cd /d "%~dp0backend"
)
mvn spring-boot:run
pause
