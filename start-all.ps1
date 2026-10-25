# PowerShell Startup Script for AI Resume Analyzer and Job Matcher
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  AI Resume Analyzer & Job Matcher - Final Year CSE    " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Starting Python FastAPI AI Microservice on Port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ai-service; python -m uvicorn app.main:app --port 8000 --reload"

Write-Host "[2/3] Starting Express.js Backend Server on Port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

Write-Host "[3/3] Starting React Vite Frontend Client on Port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n✔ All services started successfully!" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:5000/api" -ForegroundColor Cyan
Write-Host "  AI NLP:   http://localhost:8000/docs (Interactive Swagger)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
