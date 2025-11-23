# Deployment Guide

Complete guide to deploy the CSS Review Platform to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- Neon account (for database)

## Step 1: Database Setup (Neon)

1. Go to https://neon.tech and sign up
2. Create a new project
3. Create a new database named `css_review`
4. Copy the connection string (it will look like: `postgresql://user:password@host/css_review`)
5. Keep this safe - you'll need it for the backend

## Step 2: Backend Deployment (Render)

### Prepare Backend

1. Update `backend/.env.example` with all required variables
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Deploy on Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: css-review-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

5. Add environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `JWT_SECRET`: Generate a strong secret (use `openssl rand -base64 32`)
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render's default)

6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy the service URL (e.g., `https://css-review-api.onrender.com`)

### Set Up Database Schema

1. Connect to your Neon database using psql:
```bash
psql "postgresql://user:password@host/css_review"
```

2. Run the schema:
```bash
\i backend/database/schema.sql
```

3. Seed the database:
```bash
\i backend/database/seed.sql
```

4. Exit psql:
```bash
\q
```

## Step 3: Frontend Deployment (Vercel)

### Prepare Frontend

1. Update `frontend/.env.example`:
```
REACT_APP_API_URL=https://css-review-api.onrender.com
```

2. Create `frontend/.env.production` with production values
3. Commit and push:
```bash
git add .
git commit -m "Configure frontend for production"
git push origin main
```

### Deploy on Vercel

1. Go to https://vercel.com and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`

5. Add environment variables:
   - `REACT_APP_API_URL`: Your Render backend URL

6. Click "Deploy"
7. Wait for deployment to complete
8. Your frontend will be live at a URL like `https://css-review-platform.vercel.app`

## Step 4: Post-Deployment Configuration

### Update CORS Settings

Update `backend/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Add to backend environment variables:
- `FRONTEND_URL`: https://your-vercel-domain.vercel.app

### Test the Deployment

1. Visit your frontend URL
2. Try registering a new account
3. Create a lesson and quiz
4. Test all features

## Monitoring & Maintenance

### Monitor Backend (Render)

1. Go to your Render dashboard
2. Click on your service
3. Check logs for errors
4. Monitor resource usage

### Monitor Frontend (Vercel)

1. Go to your Vercel dashboard
2. Click on your project
3. Check deployment logs
4. Monitor analytics

### Database Backups (Neon)

1. Go to Neon console
2. Set up automatic backups
3. Download backups regularly

## Scaling

### Increase Backend Resources (Render)

1. Go to your Render service
2. Click "Settings"
3. Upgrade plan or adjust resources
4. Restart service

### Optimize Database (Neon)

1. Monitor query performance
2. Add indexes for frequently queried columns
3. Archive old data if needed

## Troubleshooting

### Backend Not Connecting to Database

1. Verify DATABASE_URL is correct
2. Check Neon firewall settings
3. Ensure database exists
4. Check Render logs

### Frontend Can't Reach Backend

1. Verify REACT_APP_API_URL is correct
2. Check CORS settings
3. Verify backend is running
4. Check browser console for errors

### Build Failures

1. Check build logs
2. Verify all dependencies are installed
3. Check for environment variable issues
4. Ensure correct Node version

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Input validation is in place
- [ ] Rate limiting is implemented
- [ ] Sensitive data is not logged
- [ ] Regular security updates

## Performance Optimization

### Frontend
- Enable gzip compression
- Optimize images
- Code splitting
- Lazy loading
- Caching strategies

### Backend
- Database query optimization
- Connection pooling
- Caching responses
- Compression middleware
- Load balancing

### Database
- Proper indexing
- Query optimization
- Connection pooling
- Regular maintenance

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Select previous deployment
3. Click "Promote to Production"

### Render
1. Go to your service
2. Click "Logs"
3. Redeploy from previous commit

## Support

For deployment issues:
1. Check service logs
2. Verify environment variables
3. Test API endpoints with Postman
4. Contact service support

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Docs](https://react.dev/)
