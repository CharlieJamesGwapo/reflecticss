# Neon PostgreSQL Setup Guide

Complete guide to set up and use Neon cloud database for the CSS Review Platform.

## What is Neon?

Neon is a serverless PostgreSQL database platform that:
- Requires no installation
- Provides instant databases
- Offers automatic backups
- Scales automatically
- Has a free tier
- Works perfectly with this platform

## Step 1: Create Neon Account

### 1. Sign Up
1. Go to https://neon.tech
2. Click "Sign Up"
3. Choose sign-up method:
   - Email
   - GitHub
   - Google
4. Complete verification

### 2. Verify Email
- Check your email
- Click verification link
- Complete setup

## Step 2: Create Neon Project

### 1. Create New Project
1. Log in to Neon console
2. Click "New Project"
3. Fill in details:
   - **Project Name**: `css-review` (or your choice)
   - **Database Name**: `css_review` (important - use underscore)
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 15 (recommended)

### 2. Create Project
- Click "Create Project"
- Wait for creation (usually < 1 minute)
- You'll see the connection string

## Step 3: Get Connection String

### 1. Find Connection String
1. In Neon console, click your project
2. Click "Connection string" tab
3. Copy the connection string

### 2. Connection String Format
```
postgresql://user:password@host.neon.tech/css_review?sslmode=require
```

**Example**:
```
postgresql://neonuser:abc123def456@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require
```

### 3. Save Connection String
- Copy and save it somewhere safe
- You'll need it for backend setup

## Step 4: Configure Backend

### 1. Edit Backend .env File

Navigate to `backend/.env`:

```bash
cd backend
nano .env  # or use your editor
```

### 2. Update DATABASE_URL

Replace the DATABASE_URL with your Neon connection string:

**Before**:
```
DATABASE_URL=postgresql://localhost:5432/css_review
```

**After**:
```
DATABASE_URL=postgresql://neonuser:abc123def456@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require
```

### 3. Other Variables
Keep these as they are:
```
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### 4. Save File
- Save the changes
- Close the editor

## Step 5: Set Up Database Schema

### Option A: Using psql (Recommended)

#### 1. Install psql (if needed)
```bash
# Windows: Download PostgreSQL installer
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql-client
```

#### 2. Connect to Neon
```bash
psql "postgresql://neonuser:abc123def456@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require"
```

Replace with your actual connection string.

#### 3. Run Schema
```bash
# While connected to psql, run:
\i backend/database/schema.sql
```

#### 4. Seed Data
```bash
\i backend/database/seed.sql
```

#### 5. Verify
```bash
\dt  # List tables
SELECT COUNT(*) FROM lessons;  # Should show 6
\q   # Exit
```

### Option B: Using Neon Web Console

#### 1. Open Neon Console
1. Log in to Neon
2. Click your project
3. Click "SQL Editor"

#### 2. Copy Schema SQL
1. Open `backend/database/schema.sql`
2. Copy all content

#### 3. Paste and Run
1. Paste into Neon SQL Editor
2. Click "Execute"
3. Wait for completion

#### 4. Seed Data
1. Open `backend/database/seed.sql`
2. Copy all content
3. Paste into SQL Editor
4. Click "Execute"

#### 5. Verify
```sql
SELECT COUNT(*) FROM lessons;
SELECT COUNT(*) FROM quizzes;
SELECT COUNT(*) FROM flashcards;
```

## Step 6: Test Connection

### 1. Start Backend
```bash
cd backend
npm install  # First time only
npm run dev
```

### 2. Check Logs
Look for:
```
Server running on port 5000
```

No connection errors = Success! ✅

### 3. Test API
Open browser and visit:
```
http://localhost:5000/health
```

Should return:
```json
{"status":"OK"}
```

## Step 7: Verify Database

### 1. Check Tables
```bash
psql "your_connection_string"
\dt
```

Should show:
```
users
lessons
lesson_sections
lesson_progress
quizzes
quiz_questions
quiz_choices
quiz_attempts
flashcards
flashcard_progress
```

### 2. Check Data
```sql
SELECT COUNT(*) FROM lessons;      -- Should be 6
SELECT COUNT(*) FROM quizzes;      -- Should be 3
SELECT COUNT(*) FROM flashcards;   -- Should be 8
```

## Step 8: Start Application

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Frontend
```bash
cd frontend
npm start
```

### Test
1. Visit `http://localhost:3000`
2. Register a new account
3. Browse lessons
4. Take a quiz
5. Review flashcards

## Neon Features

### View Data
1. Log in to Neon console
2. Click "SQL Editor"
3. Write queries:
```sql
SELECT * FROM users;
SELECT * FROM lessons;
SELECT * FROM quiz_attempts;
```

### Monitor Performance
1. Click "Monitoring" tab
2. View:
   - Query performance
   - Database size
   - Connection count

### Backups
1. Click "Backups" tab
2. View automatic backups
3. Restore if needed

### Settings
1. Click "Settings" tab
2. Configure:
   - Database name
   - Region
   - Connection pooling

## Common Issues & Solutions

### Connection Refused
**Error**: `Error: connect ECONNREFUSED`

**Solution**:
1. Verify connection string is correct
2. Check internet connection
3. Verify Neon project is active
4. Try reconnecting

### SSL Error
**Error**: `SSL connection error`

**Solution**:
- Ensure connection string includes `?sslmode=require`
- This is required for Neon

### Authentication Failed
**Error**: `password authentication failed`

**Solution**:
1. Copy connection string again from Neon
2. Verify username and password
3. Check for special characters
4. Escape special characters if needed

### Database Does Not Exist
**Error**: `database "css_review" does not exist`

**Solution**:
1. Create database in Neon console
2. Run schema.sql again
3. Verify database name matches

### Tables Not Found
**Error**: `relation "lessons" does not exist`

**Solution**:
1. Run schema.sql again
2. Verify no errors during execution
3. Check table names with `\dt`

## Security Best Practices

### 1. Protect Connection String
- ✅ Store in `.env` file
- ✅ Add `.env` to `.gitignore`
- ❌ Don't commit to git
- ❌ Don't share publicly
- ❌ Don't hardcode in code

### 2. Environment Variables
```bash
# .env file
DATABASE_URL=postgresql://...
JWT_SECRET=strong_random_secret
```

### 3. Production Setup
For production (Render/Vercel):
1. Set environment variables in platform
2. Don't use local .env file
3. Use strong JWT_SECRET
4. Enable SSL/HTTPS

## Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor database size
- [ ] Check query performance
- [ ] Review connection logs
- [ ] Backup important data
- [ ] Update PostgreSQL version

### Performance Tips
1. Add indexes (already done)
2. Monitor slow queries
3. Optimize queries
4. Archive old data
5. Use connection pooling

## Scaling

### When Database Gets Large
1. Upgrade Neon plan
2. Optimize queries
3. Archive old data
4. Add more indexes
5. Consider read replicas

### Neon Plans
- **Free**: Perfect for development
- **Pro**: For production
- **Enterprise**: For large scale

## Backup & Recovery

### Automatic Backups
- Neon automatically backs up
- Retention: 7 days (free), 30 days (pro)
- View in "Backups" tab

### Manual Backup
```bash
pg_dump "your_connection_string" > backup.sql
```

### Restore from Backup
```bash
psql "your_connection_string" < backup.sql
```

## Useful Neon Commands

### Connect via psql
```bash
psql "your_connection_string"
```

### List Databases
```sql
\l
```

### List Tables
```sql
\dt
```

### View Table Structure
```sql
\d table_name
```

### View Data
```sql
SELECT * FROM table_name;
```

### Count Rows
```sql
SELECT COUNT(*) FROM table_name;
```

### Exit psql
```sql
\q
```

## Troubleshooting Checklist

- [ ] Neon account created
- [ ] Project created
- [ ] Connection string copied
- [ ] Backend .env updated
- [ ] Schema applied
- [ ] Data seeded
- [ ] Backend starts without errors
- [ ] API health check works
- [ ] Frontend can register user
- [ ] Data persists in database

## Next Steps

### Local Development
1. ✅ Set up Neon
2. ✅ Configure backend
3. ✅ Start servers
4. ✅ Test locally

### Deployment
1. Read DEPLOYMENT.md
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Update environment variables

### Production
1. Upgrade Neon plan if needed
2. Enable monitoring
3. Set up backups
4. Configure alerts

## Support

### Neon Help
- Documentation: https://neon.tech/docs
- Support: https://neon.tech/support
- Community: Discord/GitHub

### This Project Help
- Setup issues: See SETUP_GUIDE.md
- API issues: See API.md
- Deployment issues: See DEPLOYMENT.md

## Summary

You now have:
- ✅ Neon database set up
- ✅ Connection string configured
- ✅ Schema and data loaded
- ✅ Backend connected
- ✅ Ready to develop

**Next**: Start the application and begin learning CSS! 🚀

---

**Questions?** Check the troubleshooting section or review the setup steps.

**Ready to deploy?** Follow DEPLOYMENT.md next!
