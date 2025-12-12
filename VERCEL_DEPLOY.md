# Deploy to Vercel - Easiest Method (5 Minutes!)

Vercel is the **easiest and fastest** way to deploy your ProfLens AUC app. One platform for everything.

---

## Why Vercel?

- ✅ **One platform** for frontend AND backend
- ✅ **No cold starts** (unlike Render's free tier)
- ✅ **Auto-detects** your React app
- ✅ **5 minutes** from start to live app
- ✅ **Better free tier** with no service sleeping
- ✅ **Automatic HTTPS** and environment variables

---

## Prerequisites

1. **GitHub account** with your code pushed
2. **MongoDB Atlas account** (free) - we'll set this up
3. **Vercel account** (free) - sign up at [vercel.com](https://vercel.com)

---

## Step 1: Setup MongoDB Atlas (5 minutes)

### Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login (use Google for fastest signup)
3. Click **"Create"** → Choose **M0 FREE** tier
4. Click **"Create Cluster"** (keep default settings)

### Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Username: `proflens`
4. Click **"Autogenerate Secure Password"** → **Copy the password!**
5. User Privileges: **"Atlas Admin"**
6. Click **"Add User"**

### Allow Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Get Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://proflens:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you copied earlier
6. Add `/proflens` before the `?` to specify database name:
   ```
   mongodb+srv://proflens:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/proflens?retryWrites=true&w=majority
   ```
7. **SAVE THIS!** You'll need it for Vercel

---

## Step 2: Deploy Backend to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `Milestone 3`
   - Click **"Edit"** next to Root Directory and select `Milestone 3`

5. Add **Environment Variables** (click "Environment Variables"):
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = mongodb+srv://proflens:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/proflens?retryWrites=true&w=majority
   JWT_SECRET = (click "Generate" or use: openssl rand -base64 32)
   JWT_EXPIRE = 7d
   FRONTEND_URL = (leave empty for now, we'll add this later)
   ```

6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment
8. You'll get a URL like: `https://proflens-auc.vercel.app`
9. **Test it**: Visit `https://YOUR-BACKEND-URL.vercel.app/api/health`

   Should return:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

10. **SAVE YOUR BACKEND URL!**

---

## Step 3: Deploy Frontend to Vercel

### Create Frontend Deployment

1. In Vercel dashboard, click **"Add New..."** → **"Project"** again
2. Import the **same repository** (yes, same one!)
3. Configure:
   - **Framework Preset**: Create React App (auto-detected)
   - **Root Directory**: `Milestone 4`
   - Click **"Edit"** next to Root Directory and select `Milestone 4`

4. Add **Environment Variables**:
   ```
   REACT_APP_API_URL = https://YOUR-BACKEND-URL.vercel.app/api
   ```
   (Replace with your backend URL from Step 2)

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. You'll get a URL like: `https://proflens-auc-frontend.vercel.app`

---

## Step 4: Update Backend CORS

Now update the backend to allow requests from your frontend:

1. Go to your **backend** project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Add/Update:
   ```
   FRONTEND_URL = https://YOUR-FRONTEND-URL.vercel.app
   ```
   (Replace with your frontend URL from Step 3)
4. Go to **Deployments** tab
5. Click **"..."** on latest deployment → **"Redeploy"**

---

## Step 5: Test Your Live App!

1. Visit your frontend URL: `https://YOUR-FRONTEND-URL.vercel.app`
2. Try signing up with an `@aucegypt.edu` email
3. Try logging in
4. Browse professors and courses
5. Submit a review

---

## Seed Database (Optional)

To add sample data:

### Option 1: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Go to backend directory
cd "Milestone 3"

# Link to your project
vercel link

# Run seed script
vercel env pull .env.local
node scripts/seedDatabase.js
```

### Option 2: Manually via MongoDB Atlas

1. Go to MongoDB Atlas
2. Click **"Browse Collections"**
3. Manually add professors, courses, and users

---

## Custom Domain (Optional)

Want a custom URL instead of `random-name.vercel.app`?

1. In Vercel project settings
2. Go to **Domains**
3. Add your custom domain
4. Or edit Vercel subdomain to something like: `proflens-auc.vercel.app`

---

## Troubleshooting

### Backend Issues

**Problem**: `/api/health` returns 404

**Solution**:
- Check Root Directory is set to `Milestone 3`
- Verify `server.js` exists in Milestone 3
- Check deployment logs for errors

**Problem**: Database connection fails

**Solution**:
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas allows 0.0.0.0/0 in Network Access
- Ensure password doesn't contain special characters (URL encode if needed)

### Frontend Issues

**Problem**: Can't connect to backend

**Solution**:
- Verify `REACT_APP_API_URL` is set correctly
- Include `/api` at the end
- Make sure backend is deployed and running
- Check browser console for CORS errors

**Problem**: 404 on page refresh

**Solution**: Vercel should auto-handle this, but if not:
- Check `vercel.json` has rewrites configured
- We'll add this file if needed

### CORS Errors

**Solution**:
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- No trailing slash
- Include `https://`

---

## Your Deployed URLs

After deployment, save these:

- **Frontend**: `https://_____.vercel.app`
- **Backend**: `https://_____.vercel.app`
- **API Base**: `https://_____.vercel.app/api`
- **Health Check**: `https://_____.vercel.app/api/health`

---

## Automatic Deployments

Every time you push to GitHub:
- Vercel automatically redeploys both frontend and backend
- You'll get preview URLs for each commit
- Production deploys only on `main` branch

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys! ✨
```

---

## Cost

**100% FREE** for this project:
- Vercel: Free tier (100GB bandwidth, unlimited deployments)
- MongoDB Atlas: M0 Free tier (512MB storage)
- Total cost: **$0/month**

---

## Advantages Over Netlify + Render

| Feature | Vercel | Netlify + Render |
|---------|--------|------------------|
| Platforms | 1 | 2 |
| Setup time | 5 min | 20 min |
| Cold starts | None | Yes (Render) |
| Configuration | Auto | Manual |
| Backend support | Built-in | Separate platform |
| Free tier quality | Excellent | Limited |

---

## That's It!

Your app is now live and accessible from anywhere! 🚀

Share your live URL with your professor and classmates to showcase your work!
