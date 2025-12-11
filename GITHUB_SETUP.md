# GitHub Setup & Deployment - Quick Guide

## Step 1: Initialize Git Repository (if not already done)

```bash
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project"

# Initialize git if needed
git init

# Check current status
git status
```

## Step 2: Stage All Files

```bash
# Add all files (respects .gitignore)
git add .

# Check what will be committed
git status
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: ProfLens AUC full-stack application

- Frontend: React app with authentication and routing
- Backend: Express.js API with MongoDB
- Features: Professor/course reviews, user authentication, search
- Ready for deployment to Netlify (frontend) and Render (backend)"
```

## Step 4: Create GitHub Repository

### Option A: Via GitHub Website

1. Go to https://github.com/new
2. Repository name: `proflens-auc` (or your choice)
3. Description: `Professor & Course Review Platform for AUC Students`
4. Visibility: **Public** or **Private**
5. **DO NOT** check "Initialize this repository with:"
   - ❌ Don't add README (we already have one)
   - ❌ Don't add .gitignore (we already have one)
   - ❌ Don't add license
6. Click "Create repository"

### Option B: Via GitHub CLI (if installed)

```bash
# Install GitHub CLI (if needed)
brew install gh

# Login to GitHub
gh auth login

# Create repository
gh repo create proflens-auc --public --source=. --remote=origin --push
```

## Step 5: Connect Local to GitHub

Copy the commands from GitHub (or use these, replacing YOUR_USERNAME):

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/proflens-auc.git

# Or if you prefer SSH
git remote add origin git@github.com:YOUR_USERNAME/proflens-auc.git

# Verify remote
git remote -v
```

## Step 6: Push to GitHub

```bash
# Rename branch to main (if it's called master)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 7: Verify Upload

Visit: https://github.com/YOUR_USERNAME/proflens-auc

You should see:
- ✅ README.md displayed on homepage
- ✅ All milestone folders
- ✅ Deployment guide
- ✅ No node_modules or .env files (these are gitignored)

---

## Next Steps: Deploy to Netlify & Render

Now that your code is on GitHub, follow the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to:

1. **Setup MongoDB Atlas** (free cloud database)
2. **Deploy Backend to Render** (connects to your GitHub repo)
3. **Deploy Frontend to Netlify** (connects to your GitHub repo)

---

## Useful Git Commands for Later

### Making Updates

```bash
# Check what changed
git status

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub (triggers auto-deployment on Netlify/Render)
git push origin main
```

### Viewing History

```bash
# See commit history
git log --oneline

# See changes in last commit
git show
```

### Branches (for team collaboration)

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature

# Push branch to GitHub
git push origin feature/new-feature
```

---

## Common Issues

### Problem: "remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add the correct one
git remote add origin https://github.com/YOUR_USERNAME/proflens-auc.git
```

### Problem: "src refspec main does not match any"

```bash
# You need to commit first
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Problem: "Permission denied (publickey)"

If using SSH and getting permission errors:

```bash
# Use HTTPS instead
git remote set-url origin https://github.com/YOUR_USERNAME/proflens-auc.git
```

Or setup SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## Repository Settings (Optional)

After pushing to GitHub, you can:

1. **Add Topics** (Settings → Topics):
   - `react`, `nodejs`, `mongodb`, `express`, `full-stack`, `student-project`

2. **Add Description**:
   - "Professor & Course Review Platform for AUC Students - Full-stack MERN application"

3. **Update README** (if needed):
   - Add screenshots
   - Add demo link after deployment
   - Add build status badges

---

## Important: What NOT to Commit

The `.gitignore` file already handles this, but make sure these are NEVER committed:

- ❌ `node_modules/` folders
- ❌ `.env` files (contain secrets!)
- ❌ `package-lock.json` (can cause conflicts)
- ❌ Build outputs (`build/`, `dist/`)
- ❌ `.DS_Store` files
- ❌ Log files

If you accidentally committed these:

```bash
# Remove from git but keep locally
git rm --cached -r node_modules
git rm --cached .env

# Commit the removal
git commit -m "Remove accidentally committed files"
git push origin main
```

---

## Ready to Deploy?

Once your code is on GitHub:

👉 Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

Your deployment will be automatic - every time you `git push`, both Netlify and Render will automatically redeploy! 🚀
