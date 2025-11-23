# Setup Environment Variables - PowerShell Script
# Run this script to automatically create .env files

Write-Host "Setting up environment variables..." -ForegroundColor Green

# Backend .env
$backendEnv = @"
DATABASE_URL=postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345678
PORT=5000
NODE_ENV=development
"@

# Frontend .env
$frontendEnv = @"
REACT_APP_API_URL=http://localhost:5000
"@

# Create backend .env
Write-Host "Creating backend/.env..." -ForegroundColor Cyan
$backendEnv | Out-File -FilePath "backend\.env" -Encoding UTF8
Write-Host "✅ backend/.env created" -ForegroundColor Green

# Create frontend .env
Write-Host "Creating frontend/.env..." -ForegroundColor Cyan
$frontendEnv | Out-File -FilePath "frontend\.env" -Encoding UTF8
Write-Host "✅ frontend/.env created" -ForegroundColor Green

Write-Host "`nEnvironment variables setup complete!" -ForegroundColor Green
Write-Host "Files created:" -ForegroundColor Yellow
Write-Host "  • backend/.env" -ForegroundColor White
Write-Host "  • frontend/.env" -ForegroundColor White
