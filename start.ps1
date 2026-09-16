#!/usr/bin/env bash
# Start script for Elixirr Essence (Windows PowerShell)

Write-Host "Starting Elixirr Essence..." -Green

# Start Backend
Set-Location backend
Write-Host "Starting backend server..." -Yellow
Start-Process powershell -ArgumentList "-Command", "npm run dev" -NoNewWindow

# Wait for backend to start
Start-Sleep -Seconds 3

# Start Admin
Set-Location ../client/admin
Write-Host "Starting admin panel..." -Yellow
Start-Process powershell -ArgumentList "-Command", "npm run dev" -NoNewWindow

# Wait for admin to start
Start-Sleep -Seconds 3

# Start Frontend
Set-Location ../client
Write-Host "Starting frontend..." -Yellow
Start-Process powershell -ArgumentList "-Command", "npm run dev" -NoNewWindow

Write-Host ""
Write-Host "All services started!" -Green
Write-Host "Frontend: http://localhost:5173" -Cyan
Write-Host "Admin Login: http://localhost:3001/admin/login" -Cyan
Write-Host "Backend API: http://localhost:5000" -Cyan
Write-Host ""
Write-Host "Close these PowerShell windows to stop all services"