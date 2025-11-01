# 🚀 GitHub Deployment Guide - CYBERIT CLAUDE

## Step 1: Create GitHub Repository

### Via GitHub Website:
1. Go to https://github.com/new
2. Repository name: `cyberit-claude`
3. Description: "Professional IT Solutions Website for Cyberlogic IT"
4. Choose: Public or Private
5. Do NOT initialize with README (we have one)
6. Click "Create repository"

### Via GitHub CLI:
```bash
gh repo create cyberit-claude --public --description "Professional IT Solutions Website"
```

## Step 2: Initialize Local Repository

```bash
cd /path/to/cyberit-claude-optimized

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: CYBERIT CLAUDE v1.0.0 - Production ready website"

# Add remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/cyberit-claude.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Configure Repository Settings

### Enable GitHub Pages:
1. Go to repository Settings
2. Navigate to "Pages"
3. Source: Deploy from branch
4. Branch: main / (root)
5. Save

Your site will be live at: `https://yourusername.github.io/cyberit-claude/`

### Add Topics:
- website
- it-consulting  
- responsive-design
- seo-optimized
- webp
- professional-website

### Add Description:
"Modern, responsive website for Cyberlogic IT featuring custom computer systems, IT consulting, and support services. Built with HTML5, CSS3, vanilla JavaScript, WebP images, and comprehensive admin panel."

## Step 4: Set Up Secrets (for CI/CD)

If using automated deployment:

1. Go to Settings → Secrets and variables → Actions
2. Add secrets:
   - `DEPLOY_HOST`: Your server IP
   - `DEPLOY_USER`: SSH username
   - `DEPLOY_KEY`: SSH private key
   - `DEPLOY_PATH`: /var/www/cyberlogicit.com.au

## Step 5: Enable GitHub Actions

The workflow file at `.github/workflows/deploy.yml` will:
- Run tests on every push
- Auto-deploy to production on main branch updates

Update the workflow file with your deployment commands.

## Step 6: Create Release

```bash
# Tag version
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"
git push origin v1.0.0

# Or via GitHub website
Go to Releases → Create new release
Tag: v1.0.0
Title: "Version 1.0.0 - Production Release"
Description: "Initial production-ready release"
```

## Repository Structure

```
cyberit-claude/
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD automation
├── assets/
│   ├── css/
│   │   ├── style.min.css    # Minified CSS (18KB)
│   │   └── responsive.min.css
│   ├── js/
│   │   ├── main.min.js      # Minified JS (7.5KB)
│   │   └── image-optimizer.min.js
│   └── images/
│       └── *.webp           # Optimized images
├── admin/
│   └── index.html
├── docs/
│   └── *.md
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── LICENSE
├── README.md
├── INSTALL.md
├── CHECKLIST.md
└── deploy.sh
```

## Useful Git Commands

```bash
# Check status
git status

# Add specific files
git add filename.ext

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name

# View commit history
git log --oneline

# Discard local changes
git checkout -- filename.ext
```

## Keeping Repository Updated

```bash
# Make changes to files
nano index.html

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update: Improved hero section responsiveness"

# Push to GitHub
git push origin main
```

## Collaboration

### For Contributors:

```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR-USERNAME/cyberit-claude.git

# Create feature branch
git checkout -b feature-name

# Make changes and commit
git add .
git commit -m "Add: New feature description"

# Push to your fork
git push origin feature-name

# Create Pull Request on GitHub
```

## Repository Badges

Add to README.md:

```markdown
![GitHub stars](https://img.shields.io/github/stars/yourusername/cyberit-claude)
![GitHub forks](https://img.shields.io/github/forks/yourusername/cyberit-claude)
![GitHub issues](https://img.shields.io/github/issues/yourusername/cyberit-claude)
![GitHub license](https://img.shields.io/github/license/yourusername/cyberit-claude)
```

## Important Notes

1. **Security**: Never commit:
   - Admin passwords
   - API keys
   - Database credentials
   - SSH keys
   
2. **Large Files**: Don't commit:
   - Large videos
   - Unoptimized images (> 1MB)
   - Backup files
   
3. **Updates**: Always test locally before pushing to main

4. **Branches**: Use feature branches for development

## Support

For GitHub-specific issues:
- [GitHub Docs](https://docs.github.com)
- [GitHub Community](https://github.community)

For project support:
- Email: info@cyberlogicit.com.au
- Issues: https://github.com/yourusername/cyberit-claude/issues

---

**Ready to deploy!** 🚀
