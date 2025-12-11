# ProfLens AUC - Deployment Guide

This guide will walk you through deploying the ProfLens AUC application with:
- **Frontend** on Netlify
- **Backend** on Render
- **Database** on MongoDB Atlas

---

## Prerequisites

1. GitHub account
2. Netlify account (free tier available at [netlify.com](https://netlify.com))
3. Render account (free tier available at [render.com](https://render.com))
4. MongoDB Atlas account (free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

---

## Part 1: Setup MongoDB Atlas (Database)

### 1. Create a MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in
2. Click "Build a Database"
3. Choose **M0 FREE** tier
4. Select a cloud provider and region (choose one closest to your users)
5. Name your cluster (e.g., "proflens-auc")
6. Click "Create"

### 2. Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `proflens-admin` (or your choice)
5. Password: Generate a strong password (SAVE THIS!)
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### 3. Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for production, you'd restrict this)
4. Click "Confirm"

### 4. Get Connection String

1. Go to **Databases** (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Add database name at the end: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/proflens`
8. **SAVE THIS CONNECTION STRING** - you'll need it for Render

---

## Part 2: Deploy Backend to Render

### 1. Prepare Your Code

Make sure your code is pushed to GitHub:

```bash
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project"
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository: `ProfLens-AUC` (or whatever you named it)
5. Configure the service:
   - **Name**: `proflens-auc-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `Milestone 3`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Add Environment Variables

Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` (Render will override this) |
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/proflens` (from Part 1) |
| `JWT_SECRET` | Generate a random string (e.g., use this command: `openssl rand -base64 32`) |
| `JWT_EXPIRE` | `7d` |
| `FRONTEND_URL` | We'll update this after deploying frontend |

### 4. Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://proflens-auc-backend.onrender.com`
4. **SAVE THIS URL** - you'll need it for the frontend

### 5. Test the Backend

Visit: `https://proflens-auc-backend.onrender.com/api/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-11T..."
}
```

### 6. Seed the Database (Optional)

If you want to populate with sample data:

1. In Render dashboard, go to your service
2. Go to "Shell" tab
3. Run: `npm run seed`

---

## Part 3: Deploy Frontend to Netlify

### 1. Update Frontend Environment Variables

Before deploying, update your frontend to point to the deployed backend:

1. Edit `Milestone 4/.env`:
```env
REACT_APP_API_URL=https://proflens-auc-backend.onrender.com/api
```

2. Commit this change:
```bash
git add "Milestone 4/.env"
git commit -m "Update API URL for production"
git push origin main
```

### 2. Deploy to Netlify

**Option A: Deploy via Netlify Dashboard**

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your repository
5. Select your repository
6. Configure build settings:
   - **Base directory**: `Milestone 4`
   - **Build command**: `npm run build`
   - **Publish directory**: `Milestone 4/build`
7. Click "Show advanced" → "New variable"
8. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://proflens-auc-backend.onrender.com/api`
9. Click "Deploy site"

**Option B: Deploy via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to frontend directory
cd "Milestone 4"

# Build the app
npm run build

# Deploy
netlify deploy --prod
```

### 3. Get Your Frontend URL

After deployment completes, you'll get a URL like:
- `https://random-name-12345.netlify.app`

You can customize this:
1. Go to "Site settings" → "Domain management"
2. Click "Options" → "Edit site name"
3. Change to: `proflens-auc` (if available)
4. Your URL becomes: `https://proflens-auc.netlify.app`

---

## Part 4: Final Configuration

### 1. Update Backend CORS

Update the `FRONTEND_URL` environment variable in Render:

1. Go to Render dashboard → Your service
2. Go to "Environment"
3. Update `FRONTEND_URL` to your Netlify URL: `https://proflens-auc.netlify.app`
4. Save changes (this will redeploy)

### 2. Test the Full Application

1. Visit your Netlify URL: `https://proflens-auc.netlify.app`
2. Try signing up with an @aucegypt.edu email
3. Try logging in
4. Browse professors and courses
5. Submit a review

---

## Part 5: Continuous Deployment

Now whenever you push to GitHub:
- Netlify will automatically rebuild and redeploy your frontend
- Render will automatically rebuild and redeploy your backend

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

---

## Troubleshooting

### Backend Issues

**Problem**: Backend won't start on Render

**Solutions**:
1. Check logs in Render dashboard
2. Verify `MONGODB_URI` is correct
3. Ensure MongoDB Atlas allows connections from anywhere
4. Check that Node version matches (20.x)

**Problem**: Database connection fails

**Solutions**:
1. Verify MongoDB Atlas user password
2. Check Network Access allows 0.0.0.0/0
3. Ensure connection string includes database name

### Frontend Issues

**Problem**: Can't connect to backend

**Solutions**:
1. Check `REACT_APP_API_URL` environment variable in Netlify
2. Verify backend is running: visit `/api/health`
3. Check browser console for CORS errors
4. Ensure `FRONTEND_URL` is set correctly in Render

**Problem**: Routes don't work (404 errors)

**Solution**: Ensure `netlify.toml` is in your `Milestone 4` directory with the redirect rules

### CORS Issues

If you see CORS errors in browser console:
1. Make sure `FRONTEND_URL` in Render matches your Netlify URL exactly
2. No trailing slash in the URL
3. Include `https://` protocol

---

## Production Checklist

Before going live, ensure:

- [ ] Backend health endpoint returns 200 OK
- [ ] Database connection is working
- [ ] JWT_SECRET is a strong random string
- [ ] CORS is configured correctly
- [ ] All environment variables are set
- [ ] Frontend can sign up new users
- [ ] Frontend can log in
- [ ] Protected routes work correctly
- [ ] Reviews can be submitted
- [ ] Database is seeded with initial data (optional)
- [ ] Error messages are user-friendly
- [ ] HTTPS is enabled (automatic on both platforms)

---

## URLs Reference

After deployment, save these URLs:

- **Frontend**: `https://proflens-auc.netlify.app`
- **Backend**: `https://proflens-auc-backend.onrender.com`
- **Backend API**: `https://proflens-auc-backend.onrender.com/api`
- **Health Check**: `https://proflens-auc-backend.onrender.com/api/health`

---

## Cost

Both platforms offer **free tiers**:
- **Netlify**: Free for personal projects (100GB bandwidth/month)
- **Render**: Free tier (services sleep after 15 min inactivity, cold starts take ~30s)
- **MongoDB Atlas**: Free M0 tier (512 MB storage)

**Note**: On Render's free tier, the backend will "sleep" after 15 minutes of inactivity. The first request after sleeping will take 30-60 seconds as it "wakes up". This is normal for the free tier.

---

## Support

If you encounter issues:
1. Check the deployment logs on Netlify/Render
2. Check MongoDB Atlas monitoring
3. Use browser DevTools console for frontend errors
4. Check Network tab for API request failures

---

Good luck with your deployment! 🚀
