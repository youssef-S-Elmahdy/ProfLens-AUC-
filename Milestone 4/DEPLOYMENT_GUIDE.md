# Deployment Guide - ProfLens AUC

Complete step-by-step guide for deploying the full-stack application.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- MongoDB Atlas account (for database)

## Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Cluster

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click "Build a Database"
4. Choose "FREE" M0 tier
5. Select cloud provider and region (choose closest to your users)
6. Name your cluster: `proflens-auc`
7. Click "Create"

### Step 2: Configure Database Access

1. In "Security > Database Access":
   - Click "Add New Database User"
   - Authentication Method: Password
   - Username: `proflens_admin`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

### Step 3: Configure Network Access

1. In "Security > Network Access":
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, restrict to specific IPs
   - Click "Confirm"

### Step 4: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `proflens_auc`

Example:
\`\`\`
mongodb+srv://proflens_admin:<password>@proflens-auc.xxxxx.mongodb.net/proflens_auc?retryWrites=true&w=majority
\`\`\`

### Step 5: Seed Production Database

1. Update local \`.env\` with Atlas URI:
\`\`\`bash
cd "Milestone 3"
nano .env
# Set MONGODB_URI to your Atlas connection string
\`\`\`

2. Run seed script:
\`\`\`bash
npm run seed
\`\`\`

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Repository

1. Ensure Milestone 3 has all necessary files
2. Create \`render.yaml\` (already created)
3. Commit and push to GitHub:
\`\`\`bash
git add .
git commit -m "Prepare for deployment"
git push origin main
\`\`\`

### Step 2: Create Web Service on Render

1. Go to [https://render.com](https://render.com)
2. Sign up or log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select your repository
6. Configure:
   - Name: `proflens-auc-backend`
   - Environment: `Node`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `Milestone 3`
   - Build Command: `npm install`
   - Start Command: `npm start`

### Step 3: Configure Environment Variables

In "Environment" section, add:

\`\`\`
NODE_ENV=production
MONGODB_URI=<your-atlas-connection-string>
JWT_SECRET=<generate-secure-random-string-min-32-chars>
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
PORT=5000
\`\`\`

To generate JWT_SECRET:
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your backend URL:
   \`https://proflens-auc-backend.onrender.com\`

### Step 5: Test Backend

Visit: \`https://your-backend.onrender.com/\`

Should see:
\`\`\`json
{
  "success": true,
  "message": "Welcome to ProfLens AUC API",
  "version": "1.0.0"
}
\`\`\`

## Part 3: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Update \`.env\` to use deployed backend:
\`\`\`
REACT_APP_API_URL=https://your-backend.onrender.com/api
\`\`\`

2. Test locally with production backend:
\`\`\`bash
cd "Milestone 4"
npm start
\`\`\`

3. Verify everything works, then commit:
\`\`\`bash
git add .
git commit -m "Configure for production deployment"
git push origin main
\`\`\`

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or log in
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: `Create React App`
   - Root Directory: `Milestone 4`
   - Build Command: `npm run build`
   - Output Directory: `build`

### Step 3: Configure Environment Variables

In "Environment Variables" section, add:

\`\`\`
REACT_APP_API_URL=https://your-backend.onrender.com/api
\`\`\`

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Once deployed, copy your frontend URL:
   \`https://your-app.vercel.app\`

### Step 5: Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Navigate to your backend service
3. Go to "Environment"
4. Update \`FRONTEND_URL\` to your Vercel URL:
   \`https://your-app.vercel.app\`
5. Save changes (will trigger redeploy)

## Part 4: Testing Deployment

### Test Checklist

1. **Visit Frontend URL**
   - [ ] Page loads without errors
   - [ ] UI displays correctly
   - [ ] No console errors

2. **Test Authentication**
   - [ ] Register new account
   - [ ] Login with test credentials
   - [ ] Logout successfully

3. **Test Data Fetching**
   - [ ] Professors list loads
   - [ ] Courses list loads
   - [ ] Individual professor/course pages work

4. **Test Search**
   - [ ] Search professors
   - [ ] Search courses
   - [ ] Results display correctly

5. **Test Review Submission**
   - [ ] Login required check
   - [ ] Submit professor review
   - [ ] Submit course review
   - [ ] Reviews appear immediately

6. **Test Session Persistence**
   - [ ] Refresh page while logged in
   - [ ] Session persists
   - [ ] Logout clears session

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check Render logs
- Verify MONGODB_URI is correct
- Ensure MongoDB Atlas allows connections
- Check JWT_SECRET is set

**Problem**: CORS errors
- Verify FRONTEND_URL matches your Vercel URL exactly
- Include https:// protocol
- Check no trailing slashes

### Frontend Issues

**Problem**: API calls failing
- Check REACT_APP_API_URL is correct
- Verify backend is running
- Check browser console for errors
- Test backend URL directly in browser

**Problem**: Build failures
- Check all dependencies in package.json
- Verify no import errors
- Review Vercel build logs

### Database Issues

**Problem**: Connection timeout
- Check MongoDB Atlas network access
- Verify connection string
- Ensure database user exists

## Performance Optimization

### Backend

1. Enable compression:
\`\`\`javascript
const compression = require('compression');
app.use(compression());
\`\`\`

2. Add caching headers
3. Use database indexes
4. Implement rate limiting

### Frontend

1. Enable code splitting
2. Optimize images
3. Use production build
4. Enable CDN (Vercel handles this)

## Monitoring

### Render Monitoring

- Check service metrics
- Monitor response times
- Review error logs
- Set up alerts

### Vercel Analytics

- Enable Vercel Analytics
- Monitor page views
- Track performance metrics
- Review error tracking

## Maintenance

### Regular Tasks

1. **Monitor logs** - Check for errors weekly
2. **Update dependencies** - Monthly security updates
3. **Database backups** - Atlas auto-backups enabled
4. **Performance review** - Monthly performance check

### Updating Application

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Auto-deploys to Vercel/Render
5. Verify deployment successful

## Cost Management

### Free Tier Limits

- **MongoDB Atlas**: 512MB storage (sufficient for project)
- **Render**: 750 hours/month (enough for one service)
- **Vercel**: Unlimited bandwidth for personal projects

### Staying Within Free Tier

- Monitor usage monthly
- Clean up old data periodically
- Optimize database queries
- Use appropriate instance sizes

## Security Best Practices

1. **Never commit sensitive data**
   - Use .env files
   - Add .env to .gitignore
   - Use environment variables

2. **Rotate secrets regularly**
   - Change JWT_SECRET periodically
   - Update database passwords

3. **Monitor access**
   - Review MongoDB access logs
   - Check Render/Vercel logs
   - Watch for suspicious activity

4. **Keep dependencies updated**
   - Run \`npm audit\` regularly
   - Update vulnerable packages
   - Review security advisories

## Support

For issues:
1. Check Render/Vercel documentation
2. Review MongoDB Atlas docs
3. Check application logs
4. Test locally first

## Conclusion

Your application should now be fully deployed and accessible:
- Frontend: https://your-app.vercel.app
- Backend: https://your-backend.onrender.com
- Database: MongoDB Atlas

Test all features and monitor for any issues!
