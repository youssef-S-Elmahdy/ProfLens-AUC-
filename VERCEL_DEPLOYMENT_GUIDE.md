# Complete Vercel Deployment Guide for ProfLens AUC

**A step-by-step guide to deploy your full-stack application to Vercel**

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Current System Analysis](#current-system-analysis)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Step 1: MongoDB Atlas Setup](#step-1-mongodb-atlas-setup)
- [Step 2: Prepare Backend for Deployment](#step-2-prepare-backend-for-deployment)
- [Step 3: Deploy Backend to Vercel](#step-3-deploy-backend-to-vercel)
- [Step 4: Seed Production Database](#step-4-seed-production-database)
- [Step 5: Prepare Frontend for Deployment](#step-5-prepare-frontend-for-deployment)
- [Step 6: Deploy Frontend to Vercel](#step-6-deploy-frontend-to-vercel)
- [Step 7: Final Configuration & Testing](#step-7-final-configuration--testing)
- [Troubleshooting](#troubleshooting)
- [Post-Deployment Monitoring](#post-deployment-monitoring)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ **GitHub Account** - [Sign up here](https://github.com/signup)
- ✅ **Vercel Account** - [Sign up here](https://vercel.com/signup) (use GitHub to sign in)
- ✅ **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas/register) (free tier)
- ✅ **Git installed** on your Mac - Check with `git --version`
- ✅ **Node.js v20.19.6** - Check with `node --version`
- ✅ **Vercel CLI** - We'll install this during the process

---

## Current System Analysis

Based on your current setup:

### Backend (Milestone 3)
- **Entry Point:** `server.js`
- **Start Command:** `npm start` (runs `node server.js`)
- **Dev Command:** `npm run dev` (runs `nodemon server.js`)
- **Seed Command:** `npm run seed`
- **Port:** 5000
- **Current MongoDB:** Local (`mongodb://localhost:27017/proflens_auc`)
- **Dependencies:** Express, Mongoose, JWT, bcryptjs, Helmet, CORS, Winston, Morgan
- **Vercel Config:** ✅ Already exists (`vercel.json`)

### Frontend (Milestone 4)
- **Framework:** Create React App (React 18.2.0)
- **Start Command:** `npm start` (runs `react-scripts start`)
- **Build Command:** `npm run build` (runs `react-scripts build`)
- **Port:** 3000
- **API Configuration:** Uses `REACT_APP_API_URL` environment variable
- **Current Backend URL:** `http://localhost:5000/api`

### Environment Variables Currently Used

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/proflens_auc
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Pre-Deployment Checklist

Before deploying, complete these tasks:

### 1. Create GitHub Repository

```bash
# Navigate to project root
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project"

# Initialize git (if not already done)
git init

# Create .gitignore in project root
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

# Logs
logs/
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build outputs
build/
dist/
.vercel/
EOF

# Add all files
git add .

# Commit
git commit -m "Initial commit - ProfLens AUC Full-Stack Application"
```

### 2. Create GitHub Repository Online

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `proflens-auc`
3. Description: `Full-stack professor and course review platform for AUC students`
4. **Keep it Private** (recommended for academic projects)
5. **DO NOT** initialize with README (you already have one)
6. Click **Create Repository**

### 3. Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/proflens-auc.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANT:** Verify that `.env` files are **NOT** pushed to GitHub. Check:
```bash
git log --all --full-history --pretty=format:"%H" -- "*/.env" "*/.env.local"
```
If this returns anything, your `.env` files were committed. Remove them:
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch 'Milestone 3/.env' 'Milestone 4/.env'" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

---

## Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with Google or Email
3. Fill out the questionnaire (select "Learning MongoDB" or "Building a new application")

### 1.2 Create a Cluster

1. **Choose Deployment:**
   - Click **"Create"** under "Shared" (Free tier)

2. **Cloud Provider & Region:**
   - Provider: **AWS** (recommended)
   - Region: Choose closest to you (e.g., `us-east-1` for faster performance)
   - Click **"Create Deployment"**

3. **Security Quickstart:**

   **Create Database User:**
   - Username: `proflens_admin` (or your choice)
   - Password: Click **"Autogenerate Secure Password"**
   - **⚠️ COPY THIS PASSWORD IMMEDIATELY** - Save it securely!
   - Click **"Create Database User"**

   **Network Access:**
   - Click **"Add My Current IP Address"**
   - Then click **"Add a Different IP Address"**
   - IP Address: `0.0.0.0/0` (allows access from anywhere - needed for Vercel)
   - Description: `Allow all (Vercel serverless)`
   - Click **"Add Entry"**
   - Click **"Finish and Close"**

### 1.3 Get Connection String

1. On Atlas dashboard, click **"Connect"** on your cluster
2. Select **"Connect your application"**
3. **Driver:** Node.js
4. **Version:** 5.5 or later
5. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://proflens_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Modify the connection string:**
   - Replace `<password>` with your actual password
   - Add database name before the `?`: `/proflens_auc?`

   **Final format:**
   ```
   mongodb+srv://proflens_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/proflens_auc?retryWrites=true&w=majority
   ```

7. **Save this connection string** - you'll need it multiple times!

---

## Step 2: Prepare Backend for Deployment

### 2.1 Verify Backend Configuration

Your backend is already configured correctly! The existing `vercel.json` file is perfect:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 2.2 Generate Production JWT Secret

Generate a secure JWT secret for production:

```bash
# Generate a secure random string (macOS/Linux)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Copy the output** - this is your `JWT_SECRET` for production.

Example output:
```
a7f5e8c3b2d1a9f4e6c8b7d2a3f5e8c9b1d4a7f6e8c2b5d3a9f7e1c4b8d6a2f5e9c3b7d1a4f8e6c2b9d5a3f7e1c8b4d6a2f9e5c7b3d1a8f4e6c9b2d5a7f3e1c8
```

---

## Step 3: Deploy Backend to Vercel

### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

Verify installation:
```bash
vercel --version
```

### 3.2 Login to Vercel

```bash
vercel login
```

Choose your login method (GitHub recommended).

### 3.3 Deploy Backend

```bash
# Navigate to backend directory
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 3"

# Deploy to Vercel
vercel
```

**Follow the prompts:**

1. **Set up and deploy?** → `Y` (Yes)
2. **Which scope?** → Select your account/team
3. **Link to existing project?** → `N` (No, create new)
4. **What's your project's name?** → `proflens-auc-backend` (or your choice)
5. **In which directory is your code located?** → `./` (current directory)
6. **Want to modify these settings?** → `N` (No)

**Vercel will:**
- Build your project
- Deploy it
- Provide you with URLs

**Example output:**
```
✅  Deployed to production. Run `vercel --prod` to overwrite later (https://proflens-auc-backend.vercel.app)
📝  Inspect: https://vercel.com/your-username/proflens-auc-backend/...
🔍  Preview: https://proflens-auc-backend-xxxxx.vercel.app
```

**⚠️ IMPORTANT:** Copy your deployment URL (the one ending in `.vercel.app`)

### 3.4 Configure Backend Environment Variables

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on **"proflens-auc-backend"** project
3. Go to **"Settings"** → **"Environment Variables"**
4. Add the following variables one by one:

| Variable Name | Value | Environments |
|--------------|--------|--------------|
| `NODE_ENV` | `production` | Production |
| `MONGODB_URI` | Your MongoDB Atlas connection string | Production |
| `JWT_SECRET` | Your generated secure JWT secret | Production |
| `JWT_EXPIRE` | `7d` | Production |
| `FRONTEND_URL` | `https://proflens-auc.vercel.app` (placeholder for now) | Production |

**Steps for each variable:**
1. Click **"Add New"** → **"Environment Variable"**
2. Enter Name and Value
3. Check **"Production"** only
4. Click **"Save"**

### 3.5 Redeploy Backend with Environment Variables

After adding environment variables, redeploy:

```bash
vercel --prod
```

This will create a production deployment with your environment variables.

**Your backend URL will be:**
```
https://proflens-auc-backend.vercel.app
```

### 3.6 Test Backend Deployment

```bash
# Test health endpoint
curl https://proflens-auc-backend.vercel.app/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-12-12T..."
}
```

If you get this response, your backend is live! 🎉

---

## Step 4: Seed Production Database

Now that your backend is deployed, seed the production database:

### 4.1 Temporarily Set MongoDB URI Locally

```bash
# Navigate to Milestone 3
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 3"

# Export MongoDB Atlas URI (replace with your actual URI)
export MONGODB_URI="mongodb+srv://proflens_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/proflens_auc?retryWrites=true&w=majority"

# Run seed script
npm run seed
```

**Expected output:**
```
✓ Connected to MongoDB
✓ Database cleared
✓ Created 2 users
✓ Created 10 professors
✓ Created 15 courses
✓ Created 25 reviews
✓ Database seeded successfully!
```

### 4.2 Verify Database on Atlas

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click **"Browse Collections"** on your cluster
3. Select database **"proflens_auc"**
4. You should see collections: `users`, `professors`, `courses`, `reviews`
5. Click on each to verify data

---

## Step 5: Prepare Frontend for Deployment

### 5.1 Create .gitignore for Frontend

```bash
# Navigate to frontend directory
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 4"

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Testing
/coverage

# Production build
/build

# Environment variables
.env
.env.local
.env.production
.env.production.local

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# Vercel
.vercel
EOF
```

### 5.2 Update Environment Variable Example

```bash
# Create .env.example for documentation
cat > .env.example << 'EOF'
# Backend API URL
# Development: http://localhost:5000/api
# Production: https://your-backend.vercel.app/api
REACT_APP_API_URL=http://localhost:5000/api
EOF
```

### 5.3 Test Production Build Locally

```bash
# Build the production version
npm run build
```

This will create a `build/` folder with optimized production files.

**Expected output:**
```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  XX.XX kB  build/static/js/main.xxxxxxxx.js
  XX.XX kB  build/static/css/main.xxxxxxxx.css

The build folder is ready to be deployed.
```

If you see errors, fix them before proceeding.

### 5.4 Commit Frontend Changes

```bash
# Navigate to project root
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project"

# Add .gitignore
git add "Milestone 4/.gitignore"
git add "Milestone 4/.env.example"

# Commit
git commit -m "Add frontend .gitignore and env example for deployment"

# Push to GitHub
git push origin main
```

---

## Step 6: Deploy Frontend to Vercel

### 6.1 Deploy Frontend

```bash
# Navigate to frontend directory
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 4"

# Deploy to Vercel
vercel
```

**Follow the prompts:**

1. **Set up and deploy?** → `Y` (Yes)
2. **Which scope?** → Select your account/team
3. **Link to existing project?** → `N` (No, create new)
4. **What's your project's name?** → `proflens-auc` (or `proflens-auc-frontend`)
5. **In which directory is your code located?** → `./` (current directory)
6. **Want to modify these settings?** → `N` (No)

**Vercel will auto-detect Create React App and:**
- Build Command: `npm run build` ✅ Automatically set
- Output Directory: `build` ✅ Automatically set
- Install Command: `npm install` ✅ Automatically set

**Example output:**
```
✅  Deployed to production. Run `vercel --prod` to overwrite later (https://proflens-auc.vercel.app)
📝  Inspect: https://vercel.com/your-username/proflens-auc/...
🔍  Preview: https://proflens-auc-xxxxx.vercel.app
```

**⚠️ IMPORTANT:** Copy your frontend deployment URL (the one ending in `.vercel.app`)

### 6.2 Configure Frontend Environment Variables

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on **"proflens-auc"** (or your frontend project name)
3. Go to **"Settings"** → **"Environment Variables"**
4. Add the following variable:

| Variable Name | Value | Environments |
|--------------|--------|--------------|
| `REACT_APP_API_URL` | `https://proflens-auc-backend.vercel.app/api` (your backend URL) | Production |

**Steps:**
1. Click **"Add New"** → **"Environment Variable"**
2. Name: `REACT_APP_API_URL`
3. Value: `https://proflens-auc-backend.vercel.app/api` (replace with YOUR backend URL)
4. Check **"Production"** only
5. Click **"Save"**

### 6.3 Update Backend CORS Configuration

Now update your backend's `FRONTEND_URL` environment variable with the actual frontend URL:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on **"proflens-auc-backend"** project
3. Go to **"Settings"** → **"Environment Variables"**
4. Find `FRONTEND_URL`
5. Click **"Edit"**
6. Change value to: `https://proflens-auc.vercel.app` (your actual frontend URL)
7. Click **"Save"**

### 6.4 Redeploy Both Projects

```bash
# Redeploy backend with updated CORS
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 3"
vercel --prod

# Redeploy frontend with environment variable
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 4"
vercel --prod
```

---

## Step 7: Final Configuration & Testing

### 7.1 Verify Deployments

**Backend:**
```bash
curl https://proflens-auc-backend.vercel.app/api/health
```

**Expected:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

**Frontend:**
Open in browser: `https://proflens-auc.vercel.app`

You should see the login page.

### 7.2 Complete End-to-End Testing

1. **Open your deployed frontend:** `https://proflens-auc.vercel.app`

2. **Test Registration:**
   - Click "Sign Up"
   - Email: `yourname@aucegypt.edu` (use your real AUC email)
   - Password: Create a strong password
   - Fill in other details
   - Click "Register"
   - **Expected:** Registration successful, redirected to home

3. **Test Login:**
   - Use the test account:
     - Email: `student@aucegypt.edu`
     - Password: `password123`
   - Click "Login"
   - **Expected:** Login successful, see homepage with professors/courses

4. **Test Browse Professors:**
   - Verify professors are displayed
   - Click on a professor card
   - **Expected:** Navigate to professor detail page with ratings

5. **Test Browse Courses:**
   - Go back to home
   - Scroll to courses section
   - Click on a course card
   - **Expected:** Navigate to course detail page with ratings

6. **Test Search:**
   - Use the search bar on home page
   - Search for "Mohamed" or "CSCE"
   - **Expected:** See search results

7. **Test Review Submission:**
   - Go to a professor detail page
   - Click "Add Review" or "Write a Review"
   - Fill out the form:
     - Rating: 5 stars
     - Difficulty: 3
     - Comment: "Great professor!"
     - Semester: Fall
     - Year: 2024
   - Submit review
   - **Expected:** Review appears on professor page

8. **Test Review Display:**
   - Refresh the professor page
   - **Expected:** Your review should appear in the reviews list

9. **Test Mark Helpful:**
   - Click "Helpful" button on a review
   - **Expected:** Count increments by 1

10. **Test Logout:**
    - Click logout button
    - **Expected:** Redirected to login page, session cleared

### 7.3 Check Browser Console for Errors

Open DevTools (F12 or Cmd+Option+I):
- Go to **Console** tab
- Look for any red error messages
- All API calls should return 200 or 201 status codes
- No CORS errors should appear

### 7.4 Verify Backend API Calls

In browser DevTools:
1. Go to **Network** tab
2. Filter by **XHR** or **Fetch**
3. Perform actions (login, view professor, submit review)
4. Check that all requests go to `https://proflens-auc-backend.vercel.app/api`
5. All should return successful status codes (200, 201)

---

## Troubleshooting

### Issue 1: CORS Error - "Access-Control-Allow-Origin"

**Symptoms:**
```
Access to XMLHttpRequest at 'https://proflens-auc-backend.vercel.app/api/...' from origin 'https://proflens-auc.vercel.app' has been blocked by CORS policy
```

**Solution:**
1. Verify `FRONTEND_URL` in backend environment variables matches your frontend URL exactly
2. Go to Vercel dashboard → Backend project → Settings → Environment Variables
3. Check `FRONTEND_URL` = `https://proflens-auc.vercel.app` (no trailing slash)
4. Redeploy backend: `vercel --prod`

### Issue 2: 500 Internal Server Error on API Calls

**Symptoms:**
- API returns 500 errors
- Reviews not submitting
- Login fails

**Solution:**
1. Check Vercel function logs:
   - Go to Vercel dashboard → Backend project → **"Deployments"**
   - Click latest deployment → **"Functions"** tab → Click function
   - Check logs for errors
2. Common causes:
   - MongoDB connection string incorrect
   - JWT_SECRET not set
   - Environment variables missing

**Fix:**
```bash
# Verify MongoDB connection locally
export MONGODB_URI="your-atlas-uri"
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✓ Connected')).catch(err => console.error('✗ Failed:', err.message))"
```

### Issue 3: Frontend Shows "Cannot connect to backend"

**Symptoms:**
- Frontend loads but shows connection error
- No data displays

**Solution:**
1. Verify `REACT_APP_API_URL` in frontend environment variables
2. Go to Vercel dashboard → Frontend project → Settings → Environment Variables
3. Check `REACT_APP_API_URL` = `https://proflens-auc-backend.vercel.app/api`
4. **Must include `/api` at the end**
5. Redeploy frontend: `vercel --prod`

### Issue 4: Reviews Not Displaying After Submission

**Symptoms:**
- Review submits successfully (201 response)
- Review doesn't appear on page

**Solution:**
This was already fixed in your code! The issue was:
```javascript
// WRONG
setReviews(reviewsResponse.data.data || []);

// CORRECT (already in your code)
setReviews(reviewsResponse.data.data.reviews || []);
```

If still not working:
1. Check browser console for errors
2. Check Network tab - verify API returns reviews
3. Hard refresh page (Cmd+Shift+R)

### Issue 5: Login Works Locally but Not in Production

**Symptoms:**
- Login works on localhost
- Login fails on Vercel deployment

**Solution:**
1. Verify JWT_SECRET is set in backend environment variables
2. Check that JWT_SECRET is **different** from local development
3. Clear browser localStorage:
   ```javascript
   // In browser console
   localStorage.clear()
   location.reload()
   ```

### Issue 6: MongoDB Atlas Connection Timeout

**Symptoms:**
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster
```

**Solution:**
1. Go to MongoDB Atlas → Network Access
2. Verify `0.0.0.0/0` is in IP whitelist
3. If not, add it:
   - Click **"Add IP Address"**
   - Select **"Allow Access from Anywhere"**
   - Click **"Confirm"**

### Issue 7: Vercel Build Fails

**Symptoms:**
```
Error: Command "npm run build" exited with 1
```

**Solution:**
1. Check build logs in Vercel dashboard
2. Common causes:
   - Missing dependencies in package.json
   - TypeScript errors (if using TS)
   - Environment variables accessed during build

**Fix:**
```bash
# Test build locally first
npm run build

# If it works locally but fails on Vercel:
# - Check Node.js version (Vercel uses latest by default)
# - Add .nvmrc or package.json engines field
```

### Issue 8: "Mixed Content" Warnings

**Symptoms:**
```
Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure resource 'http://...'
```

**Solution:**
Ensure all URLs use HTTPS:
- Backend URL: `https://proflens-auc-backend.vercel.app`
- Frontend URL: `https://proflens-auc.vercel.app`
- No `http://` URLs in production code

---

## Post-Deployment Monitoring

### 1. Monitor Vercel Analytics

**Frontend:**
1. Go to Vercel dashboard → Frontend project
2. Click **"Analytics"** tab
3. Monitor:
   - Page views
   - Visitor count
   - Performance metrics
   - Error rates

**Backend:**
1. Go to Vercel dashboard → Backend project
2. Click **"Analytics"** tab
3. Monitor:
   - Function invocations
   - Execution time
   - Error rates
   - Bandwidth usage

### 2. Monitor MongoDB Atlas

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click on your cluster
3. Click **"Metrics"** tab
4. Monitor:
   - Connections (should be < 500 for free tier)
   - Operations per second
   - Network traffic
   - Disk usage

### 3. Set Up Alerts (Optional)

**MongoDB Atlas:**
1. Cluster → **"Alerts"** tab
2. Click **"Add Alert"**
3. Configure alerts for:
   - High connection count
   - Disk usage > 80%
   - Replication lag

**Vercel:**
- Upgrade to Pro plan for custom alerts
- Free tier has basic monitoring only

### 4. Check Function Logs Regularly

```bash
# View recent backend logs
vercel logs proflens-auc-backend --follow

# View recent frontend logs
vercel logs proflens-auc --follow
```

Or view in dashboard:
- Project → **"Deployments"** → Select deployment → **"Logs"**

---

## Environment Variables Reference

### Complete Backend Environment Variables

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/proflens_auc?retryWrites=true&w=majority
JWT_SECRET=your-64-character-random-hex-string-from-step-2
JWT_EXPIRE=7d
FRONTEND_URL=https://proflens-auc.vercel.app
```

### Complete Frontend Environment Variables

```env
REACT_APP_API_URL=https://proflens-auc-backend.vercel.app/api
```

---

## Useful Commands Reference

### Vercel CLI Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs [project-name]

# List projects
vercel list

# Remove project
vercel remove [project-name]

# View project details
vercel inspect [deployment-url]

# Pull environment variables locally
vercel env pull

# Add domain
vercel domains add [domain.com]
```

### MongoDB Commands

```bash
# Connect to Atlas database
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/proflens_auc" --username proflens_admin

# List databases
show dbs

# Switch to database
use proflens_auc

# List collections
show collections

# Count documents
db.users.countDocuments()
db.professors.countDocuments()
db.courses.countDocuments()
db.reviews.countDocuments()

# Find all users
db.users.find()

# Delete all data (careful!)
db.users.deleteMany({})
db.professors.deleteMany({})
db.courses.deleteMany({})
db.reviews.deleteMany({})
```

### Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main

# View remote URL
git remote -v

# Pull latest changes
git pull origin main
```

---

## Custom Domain Setup (Optional)

If you want to use a custom domain like `proflens.yourdomain.com`:

### 1. Purchase Domain

Buy from: Namecheap, GoDaddy, Google Domains, etc.

### 2. Add Domain to Vercel

```bash
# For frontend
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 4"
vercel domains add yourdomain.com
```

Or in dashboard:
1. Project → **"Settings"** → **"Domains"**
2. Enter your domain
3. Click **"Add"**

### 3. Update DNS Records

Add these DNS records at your domain registrar:

**For root domain (yourdomain.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For subdomain (www.yourdomain.com):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### 4. Update Environment Variables

Update `FRONTEND_URL` in backend to your new domain:
```
FRONTEND_URL=https://yourdomain.com
```

---

## Security Best Practices

### 1. Rotate JWT Secret Periodically

Every 3-6 months, generate a new JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update in Vercel → Backend → Settings → Environment Variables

### 2. Monitor MongoDB Access

Check Atlas **"Access Manager"** regularly for unauthorized users.

### 3. Enable Two-Factor Authentication

- **Vercel:** Account Settings → Security → Enable 2FA
- **GitHub:** Settings → Password and authentication → Enable 2FA
- **MongoDB Atlas:** Account → Security → Enable 2FA

### 4. Review Logs Weekly

Check for:
- Unusual traffic patterns
- Failed login attempts (rate limiting)
- Database connection errors

### 5. Keep Dependencies Updated

```bash
# Check for outdated packages
cd "Milestone 3"
npm outdated

cd "../Milestone 4"
npm outdated

# Update (carefully, test locally first)
npm update
```

---

## Cost Breakdown (Free Tier)

### Vercel Free Tier Limits

**Frontend + Backend:**
- **Bandwidth:** 100 GB/month (combined)
- **Function Execution:** 100 GB-hours/month
- **Function Duration:** 10 seconds max
- **Deployments:** Unlimited
- **Team Members:** 1 (Hobby plan)
- **Custom Domains:** Unlimited

**Typical Usage for This Project:**
- ~1-5 GB bandwidth/month (low traffic)
- ~5-10 GB-hours function execution
- Well within free tier limits

### MongoDB Atlas Free Tier (M0)

**Limits:**
- **Storage:** 512 MB
- **RAM:** Shared
- **Connections:** 500 concurrent max
- **Backup:** No automatic backups
- **Bandwidth:** No limit

**Your Current Usage:**
- ~2-5 MB (seeded data)
- ~5-10 connections (low traffic)
- Well within free tier limits

**Total Monthly Cost:** $0.00 for both Vercel and MongoDB Atlas free tiers!

---

## Rollback Procedure

If something goes wrong after deployment:

### 1. Rollback Backend

```bash
# Go to Vercel dashboard → Backend project → Deployments
# Find previous working deployment
# Click "..." → "Promote to Production"
```

Or via CLI:
```bash
vercel rollback proflens-auc-backend
```

### 2. Rollback Frontend

```bash
# Same process
vercel rollback proflens-auc
```

### 3. Rollback Database

**If you need to restore data:**

Unfortunately, free tier has no automatic backups. Options:
1. Re-run seed script (loses user-generated data)
2. Upgrade to M2 tier ($9/month) for automated backups

**Prevention:**
Before major changes, export data:
```bash
# Export all collections
mongodump --uri="mongodb+srv://..." --out=./backup-$(date +%Y%m%d)
```

---

## Final Deployment Checklist

Before announcing your app is live, verify:

### Backend
- [ ] Health check returns 200: `curl https://your-backend.vercel.app/api/health`
- [ ] MongoDB Atlas connection working
- [ ] All environment variables set correctly
- [ ] CORS allows your frontend domain
- [ ] JWT authentication working
- [ ] No errors in Vercel function logs

### Frontend
- [ ] App loads without errors
- [ ] Login works
- [ ] Registration works
- [ ] All pages render correctly
- [ ] API calls successful (check Network tab)
- [ ] No console errors in browser
- [ ] Responsive design works on mobile

### Database
- [ ] Production database seeded
- [ ] Test accounts exist and work
- [ ] Sample data displays correctly
- [ ] IP whitelist includes 0.0.0.0/0

### Security
- [ ] `.env` files NOT in GitHub
- [ ] Strong JWT_SECRET in production
- [ ] MongoDB user has strong password
- [ ] HTTPS only (no mixed content)
- [ ] CORS restricted to your frontend domain

### Documentation
- [ ] README.md updated with deployment URLs
- [ ] Environment variables documented
- [ ] Test accounts documented
- [ ] Deployment guide completed (this file)

---

## Your Deployment URLs

After completing this guide, save these URLs:

**Production URLs:**
```
Frontend: https://proflens-auc.vercel.app
Backend:  https://proflens-auc-backend.vercel.app
API:      https://proflens-auc-backend.vercel.app/api
Health:   https://proflens-auc-backend.vercel.app/api/health
```

**Management Dashboards:**
```
Vercel Dashboard:    https://vercel.com/dashboard
MongoDB Atlas:       https://cloud.mongodb.com
GitHub Repository:   https://github.com/YOUR_USERNAME/proflens-auc
```

**Test Accounts:**
```
Student:
- Email: student@aucegypt.edu
- Password: password123

Admin:
- Email: admin@aucegypt.edu
- Password: admin123
```

---

## Support & Resources

### Official Documentation
- **Vercel:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **React:** https://react.dev
- **Express.js:** https://expressjs.com

### Community Support
- **Vercel Discord:** https://vercel.com/discord
- **Stack Overflow:** Tag questions with `vercel`, `mongodb-atlas`, `react`

### Contact
- **Vercel Support:** support@vercel.com (Pro plan only)
- **MongoDB Support:** https://support.mongodb.com

---

## Conclusion

Congratulations! Your full-stack ProfLens AUC application is now deployed and accessible worldwide! 🎉

**What you've accomplished:**
- ✅ Deployed backend API to Vercel serverless functions
- ✅ Deployed frontend React app to Vercel CDN
- ✅ Configured MongoDB Atlas cloud database
- ✅ Set up secure environment variables
- ✅ Configured CORS for production
- ✅ Seeded production database with sample data
- ✅ Tested end-to-end functionality

**Next steps:**
1. Share your app URL with classmates for testing
2. Monitor analytics and logs
3. Gather feedback and iterate
4. Consider adding custom domain
5. Keep dependencies updated

**Remember:**
- Keep your `.env` files secure and never commit them
- Monitor your Vercel and MongoDB Atlas usage
- Regularly check logs for errors
- Back up important data before making changes

---

**Deployment Completed:** December 12, 2024
**Guide Version:** 1.0.0
**Status:** ✅ Production Ready

---

For questions or issues during deployment, refer to the [Troubleshooting](#troubleshooting) section above.
