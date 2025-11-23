# Neon Database - Step-by-Step Visual Guide

Complete visual walkthrough for setting up Neon PostgreSQL database.

## 🎯 Overview

```
┌─────────────────────────────────────────────────────────┐
│  NEON SETUP FLOW                                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Create Neon Account                                 │
│     ↓                                                    │
│  2. Create Project                                      │
│     ↓                                                    │
│  3. Get Connection String                               │
│     ↓                                                    │
│  4. Update Backend .env                                 │
│     ↓                                                    │
│  5. Load Schema & Data                                  │
│     ↓                                                    │
│  6. Test Connection                                     │
│     ↓                                                    │
│  ✅ Ready to Use!                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 Step 1: Create Neon Account

### What You'll Do
Create a free Neon account to host your database.

### Instructions

**1.1 Visit Neon Website**
```
Go to: https://neon.tech
```

**1.2 Click Sign Up**
```
Look for "Sign Up" button in top right
Click it
```

**1.3 Choose Sign-Up Method**
```
Options:
  ☐ Email
  ☐ GitHub
  ☐ Google
  
Choose any method (GitHub recommended)
```

**1.4 Complete Sign-Up**
```
Fill in required information
Accept terms
Click "Sign Up"
```

**1.5 Verify Email**
```
Check your email inbox
Click verification link
Complete verification
```

### ✅ Success Indicators
- You're logged into Neon console
- You see "Welcome" message
- You can see "New Project" button

---

## 🗂️ Step 2: Create Neon Project

### What You'll Do
Create a new database project in Neon.

### Instructions

**2.1 Click "New Project"**
```
Location: Top right of Neon console
Click the button
```

**2.2 Fill Project Details**
```
┌─────────────────────────────────────────┐
│ Project Name:    css-review             │
│ Database Name:   css_review             │
│ Region:          [Choose closest]       │
│ PostgreSQL:      15 (or latest)         │
└─────────────────────────────────────────┘

IMPORTANT: Use underscore (_) in database name
```

**2.3 Select Region**
```
Choose region closest to you:
  • US East (us-east-1)
  • US West (us-west-2)
  • Europe (eu-west-1)
  • Asia Pacific (ap-southeast-1)
```

**2.4 Click "Create Project"**
```
Wait for project to be created
Usually takes < 1 minute
```

### ✅ Success Indicators
- Project appears in your projects list
- You see "Connection string" tab
- Database shows as "Active"

---

## 🔑 Step 3: Get Connection String

### What You'll Do
Copy the connection string needed for your backend.

### Instructions

**3.1 Open Your Project**
```
Click on your project name in the list
```

**3.2 Find Connection String**
```
Look for tabs at top:
  • Overview
  • SQL Editor
  • Connection string  ← Click this
  • Monitoring
  • Settings
```

**3.3 Copy Connection String**
```
You'll see something like:

postgresql://neonuser:abc123def456@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require

Click "Copy" button
```

**3.4 Save Connection String**
```
Paste it somewhere safe:
  • Notepad
  • Text file
  • Password manager
  
You'll need it in next step!
```

### Connection String Parts
```
postgresql://
  ↓
username:password
  ↓
@host.neon.tech
  ↓
/database_name
  ↓
?sslmode=require
```

### ✅ Success Indicators
- You have the full connection string
- It includes your password
- It ends with `?sslmode=require`

---

## ⚙️ Step 4: Update Backend .env

### What You'll Do
Configure your backend to use Neon database.

### Instructions

**4.1 Open Backend Folder**
```bash
cd backend
```

**4.2 Open .env File**
```bash
# Using nano editor
nano .env

# Or use your code editor
# Open: backend/.env
```

**4.3 Find DATABASE_URL**
```
Look for line:
DATABASE_URL=postgresql://localhost:5432/css_review
```

**4.4 Replace with Neon Connection String**
```
OLD:
DATABASE_URL=postgresql://localhost:5432/css_review

NEW:
DATABASE_URL=postgresql://neonuser:abc123@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require
```

**4.5 Keep Other Variables**
```
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

**4.6 Save File**
```
Ctrl+X then Y (nano)
Or Ctrl+S (most editors)
```

### Example .env File
```
DATABASE_URL=postgresql://neonuser:abc123@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require
JWT_SECRET=your_very_long_random_secret_key_here_make_it_strong
PORT=5000
NODE_ENV=development
```

### ✅ Success Indicators
- DATABASE_URL points to Neon
- Connection string is complete
- File is saved

---

## 📊 Step 5: Load Schema & Data

### What You'll Do
Create database tables and load sample data.

### Instructions

**5.1 Install psql (if needed)**
```bash
# Windows: Download PostgreSQL installer
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql-client

# Verify installation:
psql --version
```

**5.2 Connect to Neon Database**
```bash
psql "postgresql://neonuser:abc123@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require"
```

Replace with your actual connection string.

**5.3 Load Schema**
```bash
# While in psql, run:
\i backend/database/schema.sql

# Or paste the file contents and execute
```

**5.4 Load Sample Data**
```bash
# While in psql, run:
\i backend/database/seed.sql

# Or paste the file contents and execute
```

**5.5 Verify Tables**
```sql
-- List all tables
\dt

-- Count rows in each table
SELECT COUNT(*) as lessons FROM lessons;
SELECT COUNT(*) as quizzes FROM quizzes;
SELECT COUNT(*) as flashcards FROM flashcards;
```

**5.6 Exit psql**
```sql
\q
```

### Expected Output
```
lessons:      6 rows
quizzes:      3 rows
flashcards:   8 rows
```

### ✅ Success Indicators
- All tables created
- Sample data loaded
- No SQL errors
- Row counts match expected

---

## 🧪 Step 6: Test Connection

### What You'll Do
Verify that your backend can connect to Neon.

### Instructions

**6.1 Start Backend Server**
```bash
cd backend
npm install  # First time only
npm run dev
```

**6.2 Check for Errors**
```
Look for:
  ✅ "Server running on port 5000"
  ✅ No connection errors
  ✅ No database errors
```

**6.3 Test API Health Check**
```
Open browser:
http://localhost:5000/health

Should show:
{"status":"OK"}
```

**6.4 Test Database Query**
```bash
# In another terminal, test a real endpoint:
curl http://localhost:5000/api/lessons

# Should return JSON with 6 lessons
```

### ✅ Success Indicators
- Backend starts without errors
- Health check returns OK
- API endpoints respond
- No database connection errors

---

## 🎉 Step 7: Verify Everything Works

### What You'll Do
Make sure everything is set up correctly.

### Instructions

**7.1 Start Frontend**
```bash
# In new terminal
cd frontend
npm start
```

**7.2 Register New Account**
```
1. Visit http://localhost:3000
2. Click "Login"
3. Click "Register"
4. Fill in email, password, name
5. Click "Register"
```

**7.3 Test Features**
```
✅ Dashboard loads
✅ Lessons page shows 6 lessons
✅ Quizzes page shows 3 quizzes
✅ Flashcards page shows 8 cards
✅ Can complete a lesson
✅ Can take a quiz
✅ Can review flashcards
```

**7.4 Check Database**
```bash
# Connect to Neon
psql "your_connection_string"

# Check user was created
SELECT * FROM users;

# Check progress was saved
SELECT * FROM lesson_progress;

# Exit
\q
```

### ✅ Success Indicators
- All pages load
- All features work
- Data persists in database
- No errors in console

---

## 📋 Complete Checklist

- [ ] Neon account created
- [ ] Project created (css-review)
- [ ] Connection string copied
- [ ] Backend .env updated
- [ ] psql installed
- [ ] Schema loaded (schema.sql)
- [ ] Data seeded (seed.sql)
- [ ] Tables verified
- [ ] Backend starts without errors
- [ ] Health check works
- [ ] Frontend starts
- [ ] Can register account
- [ ] Can browse lessons
- [ ] Can take quiz
- [ ] Can review flashcards
- [ ] Data persists in database

---

## 🆘 Troubleshooting

### Issue: Connection Refused
```
Error: Error: connect ECONNREFUSED

Solution:
1. Check internet connection
2. Verify connection string is correct
3. Copy fresh connection string from Neon
4. Check Neon project is active
```

### Issue: SSL Error
```
Error: SSL connection error

Solution:
Ensure connection string includes:
?sslmode=require

Example:
postgresql://...@host.neon.tech/db?sslmode=require
```

### Issue: Authentication Failed
```
Error: password authentication failed

Solution:
1. Copy connection string again from Neon
2. Verify username and password
3. Check for special characters
4. Escape special characters if needed
```

### Issue: Database Not Found
```
Error: database "css_review" does not exist

Solution:
1. Create database in Neon console
2. Verify database name is "css_review"
3. Run schema.sql again
```

### Issue: Tables Not Found
```
Error: relation "lessons" does not exist

Solution:
1. Run schema.sql again
2. Verify no errors during execution
3. List tables with \dt
4. Check database name matches
```

---

## 🔐 Security Reminders

✅ **DO:**
- Store connection string in .env file
- Add .env to .gitignore
- Use strong JWT_SECRET
- Keep password safe

❌ **DON'T:**
- Commit .env to git
- Share connection string
- Hardcode in code
- Post publicly

---

## 📞 Need Help?

### Resources
- **Neon Docs**: https://neon.tech/docs
- **Setup Guide**: SETUP_GUIDE.md
- **Quick Reference**: NEON_QUICK_REFERENCE.md
- **Full Setup**: NEON_SETUP.md

### Common Issues
See troubleshooting section above

### Next Steps
1. ✅ Neon is set up
2. ✅ Backend is configured
3. 👉 Start developing!
4. 👉 Deploy to production

---

## 🚀 You're Ready!

Your Neon database is now:
- ✅ Created
- ✅ Configured
- ✅ Loaded with data
- ✅ Connected to backend
- ✅ Ready to use

**Next**: Start building your CSS learning platform! 📚

---

**Questions?** Check the troubleshooting section or review the steps above.

**Ready to deploy?** Follow DEPLOYMENT.md next!
