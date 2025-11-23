# Correct Commands - Backend vs Frontend

## ⚠️ Issue

You tried to run `npm run dev` in the frontend folder, but frontend doesn't have that script.

---

## ✅ Correct Commands

### Backend (Port 5000)

```bash
cd backend
npm run dev
```

**Scripts available in backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon ✅

---

### Frontend (Port 3000)

```bash
cd frontend
npm start
```

**Scripts available in frontend:**
- `npm start` - Start React development server ✅
- `npm run build` - Build for production
- `npm test` - Run tests

---

## 📋 Quick Reference

| What | Command | Port |
|------|---------|------|
| Backend Dev | `cd backend && npm run dev` | 5000 |
| Backend Prod | `cd backend && npm start` | 5000 |
| Frontend Dev | `cd frontend && npm start` | 3000 |
| Frontend Build | `cd frontend && npm run build` | - |

---

## 🚀 Correct Workflow

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

✅ Shows: `Server running on port 5000`

### Terminal 2: Frontend (NEW)

```bash
cd frontend
npm start
```

✅ Shows: `Compiled successfully!`
✅ Browser opens to: `http://localhost:3000`

---

## 🆘 What You Did Wrong

```bash
# ❌ WRONG - Frontend doesn't have "dev" script
cd frontend
npm run dev

# ✅ CORRECT - Frontend uses "start" script
cd frontend
npm start
```

---

## ✅ What to Do Now

### Step 1: Stop Current Process

Press `Ctrl+C` in the terminal

### Step 2: Run Correct Command

```bash
npm start
```

### Step 3: Wait for Compilation

```
Compiled successfully!

You can now view quizlet in the browser.

  Local:            http://localhost:3000
```

### Step 4: Browser Opens Automatically

Visit: `http://localhost:3000`

---

## 📝 Summary

- **Backend**: Use `npm run dev`
- **Frontend**: Use `npm start`
- **Keep both terminals open**
- **Backend on port 5000**
- **Frontend on port 3000**

---

## 🎯 Next Steps

1. Run: `npm start` in frontend folder
2. Wait for compilation
3. Browser opens to http://localhost:3000
4. Register account
5. Test features

---

**Run `npm start` now in the frontend folder!** 🚀
