# Neon Database - Quick Reference Card

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Account
```
1. Go to https://neon.tech
2. Click "Sign Up"
3. Verify email
```

### Step 2: Create Project
```
1. Click "New Project"
2. Name: css-review
3. Database: css_review
4. Click "Create"
```

### Step 3: Get Connection String
```
1. Click your project
2. Copy connection string
3. Save it safely
```

### Step 4: Update Backend .env
```bash
cd backend
nano .env
```

Replace:
```
DATABASE_URL=postgresql://user:password@host.neon.tech/css_review?sslmode=require
```

### Step 5: Load Schema & Data
```bash
psql "your_connection_string" -f backend/database/schema.sql
psql "your_connection_string" -f backend/database/seed.sql
```

---

## 📋 Connection String Format

```
postgresql://username:password@host.neon.tech/database_name?sslmode=require
```

**Example**:
```
postgresql://neonuser:abc123@ep-cool-lake-12345.us-east-1.neon.tech/css_review?sslmode=require
```

---

## 🔧 Common Commands

### Connect to Database
```bash
psql "your_connection_string"
```

### List Tables
```sql
\dt
```

### Count Rows
```sql
SELECT COUNT(*) FROM lessons;
SELECT COUNT(*) FROM quizzes;
SELECT COUNT(*) FROM flashcards;
```

### View Data
```sql
SELECT * FROM users;
SELECT * FROM lessons;
```

### Exit
```sql
\q
```

---

## ✅ Verification Checklist

- [ ] Neon account created
- [ ] Project created
- [ ] Connection string copied
- [ ] Backend .env updated
- [ ] Schema loaded
- [ ] Data seeded
- [ ] Backend starts without errors
- [ ] API responds at http://localhost:5000/health

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Connection refused | Check internet, verify connection string |
| SSL error | Add `?sslmode=require` to connection string |
| Auth failed | Copy connection string again from Neon |
| Database not found | Create database in Neon console |
| Tables not found | Run schema.sql again |

---

## 📍 Important Files

- **Connection String**: In Neon console
- **Backend Config**: `backend/.env`
- **Schema**: `backend/database/schema.sql`
- **Data**: `backend/database/seed.sql`

---

## 🔐 Security

✅ Store connection string in `.env`
✅ Add `.env` to `.gitignore`
✅ Never commit to git
✅ Never share publicly
✅ Use strong JWT_SECRET

---

## 📞 Resources

- **Neon Docs**: https://neon.tech/docs
- **Setup Guide**: NEON_SETUP.md
- **Full Guide**: SETUP_GUIDE.md
- **Deployment**: DEPLOYMENT.md

---

## ⚡ Next Steps

1. ✅ Set up Neon
2. ✅ Configure backend
3. 👉 Start servers
4. 👉 Test application
5. 👉 Deploy to production

---

**Ready?** Start your backend with `npm run dev`! 🚀
