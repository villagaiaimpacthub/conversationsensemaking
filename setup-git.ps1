# Git Repository Setup Script
# Run this script after Git is installed to initialize the repository and make the first commit

Write-Host "Setting up Git repository..." -ForegroundColor Cyan

# Initialize git repository
Write-Host "`n1. Initializing git repository..." -ForegroundColor Yellow
git init

# Add remote repository
Write-Host "`n2. Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/villagaiaimpacthub/conversationsensemaking.git

# Configure git user (using credentials from memory)
Write-Host "`n3. Configuring git user..." -ForegroundColor Yellow
git config user.name "villagaia"
git config user.email "villagaia@fvtura.com"

# Add all files
Write-Host "`n4. Staging all files..." -ForegroundColor Yellow
git add .

# Make the first commit
Write-Host "`n5. Making first commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Meeting Analysis Dashboard

- Modularized HTML project structure
- Separated CSS and JavaScript into individual files
- Implemented dynamic content loading for tabs
- Split large files to keep under 500 lines
- Added Chart.js integration for data visualization
- Created local server setup for development"

Write-Host "`n✅ Repository initialized and first commit created!" -ForegroundColor Green
Write-Host "`nTo push to GitHub, run:" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host "`nOr if the default branch is 'master':" -ForegroundColor Yellow
Write-Host "  git push -u origin master" -ForegroundColor White

