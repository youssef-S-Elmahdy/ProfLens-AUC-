# Quick Deployment Guide - ProfLens AUC

**Fast-track deployment steps for experienced users**

---

## Prerequisites

- GitHub account + repo created
- Vercel account (sign up with GitHub)
- MongoDB Atlas account (free tier)
- Code pushed to GitHub (with .gitignore excluding .env files)

---

## 1. MongoDB Atlas Setup (5 minutes)

```bash
# 1. Create cluster at cloud.mongodb.com
# 2. Create database user with strong password
# 3. Add IP: 0.0.0.0/0 (allow all)
# 4. Get connection string:
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/proflens_auc?retryWrites=true&w=majority
```

---

## 2. Deploy Backend (5 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy backend
cd "Milestone 3"
vercel

# Follow prompts, then add environment variables in Vercel dashboard:
# - NODE_ENV=production
# - MONGODB_URI=<your-atlas-uri>
# - JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
# - JWT_EXPIRE=7d
# - FRONTEND_URL=https://proflens-auc.vercel.app (placeholder)

# Redeploy with env vars
vercel --prod

# Note your backend URL: https://proflens-auc-backend.vercel.app
```

---

## 3. Seed Production Database (2 minutes)

```bash
cd "Milestone 3"
export MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/proflens_auc?retryWrites=true&w=majority"
npm run seed
```

---

## 4. Deploy Frontend (5 minutes)

```bash
# Deploy frontend
cd "../Milestone 4"
vercel

# Add environment variable in Vercel dashboard:
# - REACT_APP_API_URL=https://proflens-auc-backend.vercel.app/api

# Redeploy
vercel --prod

# Note your frontend URL: https://proflens-auc.vercel.app
```

---

## 5. Update Backend CORS (2 minutes)

```bash
# In Vercel dashboard:
# Backend project → Settings → Environment Variables
# Edit FRONTEND_URL to: https://proflens-auc.vercel.app

# Redeploy backend
cd "Milestone 3"
vercel --prod
```

---

## 6. Test Deployment (3 minutes)

```bash
# Test backend health
curl https://proflens-auc-backend.vercel.app/api/health

# Open frontend
open https://proflens-auc.vercel.app

# Test login with:
# Email: student@aucegypt.edu
# Password: password123
```

---

## Environment Variables Summary

### Backend (Vercel Dashboard)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<64-char-hex>
JWT_EXPIRE=7d
FRONTEND_URL=https://proflens-auc.vercel.app
```

### Frontend (Vercel Dashboard)
```
REACT_APP_API_URL=https://proflens-auc-backend.vercel.app/api
```

---

## Troubleshooting Quick Fixes

**CORS Error:** Update `FRONTEND_URL` in backend env vars, redeploy

**500 Error:** Check Vercel function logs, verify MongoDB URI

**Reviews not showing:** Already fixed in code (data.data.reviews path)

**Build fails:** Test `npm run build` locally first

---

## Your URLs

- **Frontend:** https://proflens-auc.vercel.app
- **Backend:** https://proflens-auc-backend.vercel.app/api
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com

---

**Total Time:** ~20 minutes

For detailed instructions, see [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
