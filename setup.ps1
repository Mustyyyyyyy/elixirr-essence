$ErrorActionPreference = "Stop"

Write-Host "Setting up Elixirr Essence..." -ForegroundColor Green

Set-Location $PSScriptRoot

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
  Write-Host "Created backend/.env. Add your PostgreSQL credentials before seeding." -ForegroundColor Yellow
}

Write-Host "Installing client dependencies..." -ForegroundColor Yellow
Set-Location ..\client
npm install
if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
}

Write-Host "Installing admin dependencies..." -ForegroundColor Yellow
Set-Location admin
npm install
if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
}

Set-Location $PSScriptRoot
Write-Host ""
Write-Host "Setup complete." -ForegroundColor Green
Write-Host "1. Edit backend\.env with valid PostgreSQL credentials."
Write-Host "2. Run: Set-Location backend; npm run seed"
Write-Host "3. Run: .\start.ps1"
Write-Host "4. Admin login: http://localhost:3001/admin/login"
