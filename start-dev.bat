@echo off
title AI Resume Analyzer & Job Matcher - Launcher
echo ========================================================
echo   AI Resume Analyzer & Job Matcher (CSE Capstone)
echo ========================================================
echo.
echo [1/3] Starting Python FastAPI AI Microservice (Port 8000)...
start "AI Service (FastAPI)" cmd /k "cd ai-service && python -m uvicorn app.main:app --port 8000 --reload"

echo [2/3] Starting Express.js Backend Server (Port 5000)...
start "Backend (Node.js)" cmd /k "cd backend && npm run dev"

echo [3/3] Starting React Frontend Client (Port 5173)...
start "Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo All microservices launched in separate terminals!
echo Frontend will be accessible at: http://localhost:5173
echo Backend API health at:          http://localhost:5000/health
echo AI Microservice health at:      http://localhost:8000/health
echo ========================================================
pause
