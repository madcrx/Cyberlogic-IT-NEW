@echo off
REM ═══════════════════════════════════════════════════════════════
REM Cyberlogic IT - GitHub Deployment Script (Windows)
REM Automatically commits and pushes all changes to GitHub
REM ═══════════════════════════════════════════════════════════════

echo.
echo ════════════════════════════════════════════════════════════
echo   CYBERLOGIC IT - GitHub Deployment Tool
echo ════════════════════════════════════════════════════════════
echo.

REM Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Git is not installed!
    echo.
    echo Please install Git for Windows from:
    echo https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo ✓ Git found
echo.

REM Check if this is a Git repository
if not exist ".git" (
    echo ⚠️  This is not a Git repository yet.
    echo.
    echo Initialize Git repository? (Y/N)
    set /p INIT_GIT=
    
    if /i "%INIT_GIT%"=="Y" (
        echo.
        echo Initializing Git repository...
        git init
        echo.
        echo ✓ Git repository initialized
        echo.
        echo Enter your GitHub repository URL:
        echo Example: https://github.com/username/repository.git
        set /p REPO_URL=
        
        git remote add origin %REPO_URL%
        echo.
        echo ✓ Remote repository added
    ) else (
        echo.
        echo Deployment cancelled.
        pause
        exit /b 0
    )
)

echo ════════════════════════════════════════════════════════════
echo   PREPARING FILES FOR DEPLOYMENT
echo ════════════════════════════════════════════════════════════
echo.

REM Check Git status
echo Current repository status:
git status --short
echo.

echo ════════════════════════════════════════════════════════════
echo   STAGING CHANGES
echo ════════════════════════════════════════════════════════════
echo.

REM Add all changes
git add .
echo ✓ All changes staged
echo.

echo ════════════════════════════════════════════════════════════
echo   COMMIT MESSAGE
echo ════════════════════════════════════════════════════════════
echo.
echo Enter commit message (or press Enter for default):
set /p COMMIT_MSG=

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Update website - %date% %time%
)

echo.
echo Committing with message: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
echo.
echo ✓ Changes committed
echo.

echo ════════════════════════════════════════════════════════════
echo   PUSHING TO GITHUB
echo ════════════════════════════════════════════════════════════
echo.

REM Determine branch name
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set BRANCH=%%a

if "%BRANCH%"=="" (
    echo Setting up main branch...
    git branch -M main
    set BRANCH=main
)

echo Pushing to branch: %BRANCH%
git push -u origin %BRANCH%

if %errorlevel% equ 0 (
    echo.
    echo ════════════════════════════════════════════════════════════
    echo   ✓ DEPLOYMENT SUCCESSFUL!
    echo ════════════════════════════════════════════════════════════
    echo.
    echo Your website has been pushed to GitHub successfully.
    echo.
    echo Next steps:
    echo   1. Visit your GitHub repository
    echo   2. Check the files are uploaded
    echo   3. Set up GitHub Pages (if desired)
    echo.
) else (
    echo.
    echo ════════════════════════════════════════════════════════════
    echo   ❌ DEPLOYMENT FAILED
    echo ════════════════════════════════════════════════════════════
    echo.
    echo There was an error pushing to GitHub.
    echo.
    echo Common issues:
    echo   - Authentication required (use GitHub Desktop or SSH keys)
    echo   - Remote repository doesn't exist
    echo   - No internet connection
    echo.
    echo Please check the error message above and try again.
    echo.
)

pause
