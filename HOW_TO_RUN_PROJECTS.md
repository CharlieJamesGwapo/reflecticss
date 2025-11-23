# How to Run the CSS Review Platform

Complete guide to run both backend and frontend projects.

---

## 📋 Prerequisites

Before running the projects, make sure you have:

- ✅ Node.js installed (v16+)
- ✅ npm installed (v8+)
- ✅ PostgreSQL client (psql) installed
- ✅ Neon database created
- ✅ `.env` files created (backend and frontend)
- ✅ Database schema loaded
- ✅ Sample data seeded

---

## 🚀 Quick Start (3 Steps)

### Step 1: Load Database (One Time Only)

```bash
# Load schema
psql 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require' -f backend/database/schema.sql

# Load sample data
psql 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require' -f backend/database/seed.sql
```

### Step 2: Start Backend

```bash
cd backend
npm install  # First time only
npm run dev
```

You should see:
```
Server running on port 5000
```

### Step 3: Start Frontend (New Terminal)

```bash
cd frontend
npm install  # First time only
npm start
```

Browser will open to:
```
http://localhost:3000
```

---

## 📝 Detailed Instructions

### PART 1: Setup Environment Variables

#### Windows (PowerShell)

**Open PowerShell in project folder and run:**
```powershell
.\setup-env.ps1
```

#### Mac/Linux (Bash)

**Open Terminal in project folder and run:**
```bash
chmod +x setup-env.sh
./setup-env.sh
```

This creates:
- `backend/.env`
- `frontend/.env`

---

### PART 2: Load Database (One Time)

#### Option A: Using psql Command Line

**Terminal 1:**
```bash
# Load schema
psql 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require' -f backend/database/schema.sql
```

**Terminal 1:**
```bash
# Load sample data
psql 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require' -f backend/database/seed.sql
```

#### Option B: Using Neon Web Console

1. Log in to Neon console
2. Click "SQL Editor"
3. Copy content from `backend/database/schema.sql`
4. Paste and execute
5. Copy content from `backend/database/seed.sql`
6. Paste and execute

---

### PART 3: Run Backend Server

#### Step 1: Open Terminal

Navigate to project folder:
```bash
cd quizlet
```

#### Step 2: Go to Backend Folder

```bash
cd backend
```

#### Step 3: Install Dependencies (First Time Only)

```bash
npm install
```

This installs all required packages from `package.json`

#### Step 4: Start Development Server

```bash
npm run dev
```

#### Expected Output

```
Server running on port 5000
```

#### Test Backend

Open browser and visit:
```
http://localhost:5000/health
```

Should show:
```json
{"status":"OK"}
```

#### Keep This Terminal Open

Leave this running while you use the app!

---

### PART 4: Run Frontend Application

#### Step 1: Open New Terminal

**Don't close the backend terminal!** Open a new one.

#### Step 2: Navigate to Frontend

```bash
cd quizlet/frontend
```

Or if you're in the project root:
```bash
cd frontend
```

#### Step 3: Install Dependencies (First Time Only)

```bash
npm install
```

This installs all required packages from `package.json`

#### Step 4: Start React Application

```bash
npm start
```

#### Expected Output

```
Compiled successfully!

You can now view quizlet in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Browser should automatically open to:
```
http://localhost:3000
```

#### Keep This Terminal Open

Leave this running while you use the app!

---

## 🎯 Running the Full Application

### Terminal Setup

You need **2 terminals open at the same time**:

```
┌─────────────────────────────────────┐
│ Terminal 1: Backend                 │
│ cd backend                          │
│ npm run dev                         │
│ Running on port 5000                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Terminal 2: Frontend                │
│ cd frontend                         │
│ npm start                           │
│ Running on port 3000                │
└─────────────────────────────────────┘
```

### Access the Application

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:5000
3. **Health Check**: http://localhost:5000/health

---

## 📊 What Each Terminal Does

### Backend Terminal (Port 5000)

```bash
cd backend
npm run dev
```

**Provides:**
- REST API endpoints
- Database connection
- User authentication
- Lesson management
- Quiz management
- Flashcard management

**Keep running:** Yes, always

---

### Frontend Terminal (Port 3000)

```bash
cd frontend
npm start
```

**Provides:**
- React web application
- User interface
- Navigation
- Forms
- Pages

**Keep running:** Yes, always

---

## ✅ Verification Checklist

After starting both servers:

- [ ] Backend terminal shows "Server running on port 5000"
- [ ] Frontend terminal shows "Compiled successfully!"
- [ ] Browser opens to http://localhost:3000
- [ ] Health check works: http://localhost:5000/health
- [ ] No errors in either terminal
- [ ] Can see the CSS Review Platform UI

---

## 🧪 Test the Application

### 1. Register Account

1. Visit http://localhost:3000
2. Click "Login"
3. Click "Register"
4. Fill in:
   - Email: test@example.com
   - Password: password123
   - Name: Test User
5. Click "Register"

### 2. Test Features

#### Dashboard
- [ ] See statistics
- [ ] See feature cards
- [ ] Navigation works

#### Lessons
- [ ] See 6 lessons
- [ ] Click on a lesson
- [ ] Read content
- [ ] Mark complete

#### Quizzes
- [ ] See 3 quizzes
- [ ] Click on a quiz
- [ ] Answer questions
- [ ] Submit quiz
- [ ] See results

#### Flashcards
- [ ] See 8 flashcards
- [ ] Click to flip
- [ ] Navigate with buttons
- [ ] Shuffle cards

---

## 🛑 Stopping the Servers

### Stop Backend

In backend terminal:
```
Ctrl+C
```

### Stop Frontend

In frontend terminal:
```
Ctrl+C
```

---

## 🔄 Restarting Servers

### Restart Backend

```bash
cd backend
npm run dev
```

### Restart Frontend

```bash
cd frontend
npm start
```

---

## 🆘 Troubleshooting

### Issue: Backend won't start

**Error**: `Error: connect ECONNREFUSED`

**Solution:**
1. Check DATABASE_URL in `backend/.env`
2. Verify Neon connection string is correct
3. Check internet connection
4. Verify Neon project is active

### Issue: Frontend won't start

**Error**: `Port 3000 is already in use`

**Solution:**
1. Kill process on port 3000:
   - Windows: `netstat -ano | findstr :3000`
   - Mac/Linux: `lsof -i :3000`
2. Or use different port: `PORT=3001 npm start`

### Issue: Can't connect to backend

**Error**: `Failed to fetch from http://localhost:5000`

**Solution:**
1. Verify backend is running
2. Check backend terminal for errors
3. Verify REACT_APP_API_URL in `frontend/.env`
4. Should be: `http://localhost:5000`

### Issue: Database connection fails

**Error**: `Error: connect ECONNREFUSED at TCPConnectWrap`

**Solution:**
1. Verify connection string in `backend/.env`
2. Check Neon project is active
3. Verify internet connection
4. Copy fresh connection string from Neon

### Issue: psql command not found

**Solution:**
1. Install PostgreSQL client
2. Windows: Download PostgreSQL installer
3. Mac: `brew install postgresql`
4. Linux: `sudo apt-get install postgresql-client`

---

## 📚 File Locations

```
quizlet/
├── backend/
│   ├── .env                 (Your environment variables)
│   ├── server.js            (Main server file)
│   ├── package.json
│   ├── database/
│   │   ├── schema.sql       (Database structure)
│   │   └── seed.sql         (Sample data)
│   └── routes/              (API endpoints)
│
├── frontend/
│   ├── .env                 (Your environment variables)
│   ├── src/
│   │   ├── App.js           (Main app component)
│   │   ├── pages/           (Page components)
│   │   └── components/      (Reusable components)
│   ├── package.json
│   └── public/
│       └── index.html       (HTML template)
```

---

## 🚀 Complete Workflow

### First Time Setup

```bash
# 1. Setup environment variables
.\setup-env.ps1  # Windows
# or
./setup-env.sh   # Mac/Linux

# 2. Load database (one time only)
psql '...' -f backend/database/schema.sql
psql '...' -f backend/database/seed.sql

# 3. Start backend (Terminal 1)
cd backend
npm install
npm run dev

# 4. Start frontend (Terminal 2)
cd frontend
npm install
npm start

# 5. Visit http://localhost:3000
```

### Subsequent Times

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm start

# Visit http://localhost:3000
```

---

## 💡 Pro Tips

### Tip 1: Keep Terminals Organized

Use separate terminal windows or tabs for backend and frontend.

### Tip 2: Monitor Logs

Watch both terminals for errors while testing.

### Tip 3: Clear Cache

If frontend acts weird:
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules
npm install
npm start
```

### Tip 4: Check Port Usage

```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :5000
lsof -i :3000
```

### Tip 5: Use Different Ports

If ports are in use:
```bash
# Backend on different port
PORT=5001 npm run dev

# Frontend on different port
PORT=3001 npm start

# Update frontend .env
REACT_APP_API_URL=http://localhost:5001
```

---

## 📞 Need Help?

- **Setup Issues**: See SETUP_ENV_AUTO.md
- **Database Issues**: See FIX_CONNECTION_STRING.md
- **API Issues**: See API.md
- **General Help**: See README.md

---

## ✅ Summary

**To run the CSS Review Platform:**

1. ✅ Setup environment variables
2. ✅ Load database (one time)
3. ✅ Start backend: `cd backend && npm run dev`
4. ✅ Start frontend: `cd frontend && npm start`
5. ✅ Visit: http://localhost:3000

**Keep both terminals open while using the app!**

---

**Ready to run?** Follow the steps above! 🚀
