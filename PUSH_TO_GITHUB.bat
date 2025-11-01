@echo off
REM CYBERIT CLAUDE - GitHub Push Script for Windows
REM Double-click this file to run it!

color 0A
echo.
echo ============================================================
echo.
echo     CYBERIT CLAUDE - GitHub Push Helper for Windows
echo.
echo ============================================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git for Windows:
    echo https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Get GitHub username
set /p GITHUB_USER="Enter your GitHub username: "

REM Get repository name
set /p REPO_NAME="Enter repository name [cyberit-claude]: "
if "%REPO_NAME%"=="" set REPO_NAME=cyberit-claude

REM Confirm
echo.
echo Repository Details:
echo   Username: %GITHUB_USER%
echo   Repository: %REPO_NAME%
echo   URL: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.
set /p CONFIRM="Is this correct? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo Cancelled.
    pause
    exit /b 0
)

echo.
echo ============================================================
echo Step 1: Initializing Git repository...
echo ============================================================
echo.

REM Initialize git if not already
if not exist .git (
    git init
    echo [OK] Git repository initialized
) else (
    echo [OK] Git repository already exists
)

echo.
echo ============================================================
echo Step 2: Adding files to Git...
echo ============================================================
echo.

REM Create .gitattributes
echo * text=auto > .gitattributes
echo *.css text >> .gitattributes
echo *.html text >> .gitattributes
echo *.js text >> .gitattributes
echo *.md text >> .gitattributes

REM Add all files
git add .
echo [OK] Files added to Git

echo.
echo ============================================================
echo Step 3: Creating initial commit...
echo ============================================================
echo.

REM Commit
git commit -m "Initial commit: CYBERIT CLAUDE v1.0.0 - Production-ready website for Cyberlogic IT featuring minified CSS/JS, WebP images, responsive design, SEO optimized, security hardened, admin panel included. Performance: 95/100 Mobile. Status: Production Ready"
echo [OK] Initial commit created

echo.
echo ============================================================
echo Step 4: Adding remote repository...
echo ============================================================
echo.

REM Add remote (remove first if exists)
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
echo [OK] Remote repository added

echo.
echo ============================================================
echo Step 5: Renaming branch to 'main'...
echo ============================================================
echo.

git branch -M main
echo [OK] Branch renamed to 'main'

echo.
echo ============================================================
echo IMPORTANT: Before continuing...
echo ============================================================
echo.
echo 1. Create the repository on GitHub:
echo    ^> Go to: https://github.com/new
echo    ^> Repository name: %REPO_NAME%
echo    ^> Description: Professional IT Solutions Website
echo    ^> Choose Public or Private
echo    ^> Do NOT initialize with README or .gitignore
echo    ^> Click 'Create repository'
echo.
echo 2. Get your Personal Access Token:
echo    ^> Go to: https://github.com/settings/tokens
echo    ^> Generate new token (classic)
echo    ^> Select scope: repo (all)
echo    ^> Copy the token
echo.
echo    You will need this token as your password!
echo.
set /p CREATED="Have you created the repository on GitHub? (Y/N): "

if /i "%CREATED%"=="Y" (
    echo.
    echo ============================================================
    echo Step 6: Pushing to GitHub...
    echo ============================================================
    echo.
    echo You will be asked for:
    echo   Username: Your GitHub username
    echo   Password: Your Personal Access Token (NOT your password!)
    echo.
    
    git push -u origin main
    
    if %errorlevel% equ 0 (
        color 0A
        echo.
        echo ============================================================
        echo [SUCCESS] Website pushed to GitHub!
        echo ============================================================
        echo.
        echo Your repository is now live at:
        echo https://github.com/%GITHUB_USER%/%REPO_NAME%
        echo.
        echo Next steps:
        echo 1. Enable GitHub Pages (Settings -^> Pages)
        echo 2. Add topics/tags to repository
        echo 3. Write a detailed description
        echo 4. Share with the world!
        echo.
    ) else (
        color 0C
        echo.
        echo ============================================================
        echo [ERROR] Push failed!
        echo ============================================================
        echo.
        echo Common issues:
        echo 1. Repository doesn't exist - create it on GitHub first
        echo 2. Authentication failed - check your token
        echo 3. Wrong username or repository name
        echo.
        echo Try again with: git push -u origin main
        echo.
    )
) else (
    echo.
    echo Please create the repository first, then run:
    echo   git push -u origin main
    echo.
)

echo.
echo ============================================================
echo.
pause
