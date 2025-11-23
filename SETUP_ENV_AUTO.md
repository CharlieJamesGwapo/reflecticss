# Automatic Environment Setup

I've created scripts to automatically set up your `.env` files.

## Choose Your Operating System

### 🪟 Windows (PowerShell)

**Step 1**: Open PowerShell in your project folder

**Step 2**: Run this command:
```powershell
.\setup-env.ps1
```

**Step 3**: Press Enter

✅ Done! Both `.env` files will be created automatically.

---

### 🍎 Mac / 🐧 Linux (Bash)

**Step 1**: Open Terminal in your project folder

**Step 2**: Make script executable:
```bash
chmod +x setup-env.sh
```

**Step 3**: Run the script:
```bash
./setup-env.sh
```

✅ Done! Both `.env` files will be created automatically.

---

## What Gets Created

### `backend/.env`
```
DATABASE_URL=postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345678
PORT=5000
NODE_ENV=development
```

### `frontend/.env`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## After Running the Script

1. ✅ Both `.env` files created
2. ✅ Environment variables set
3. 👉 Run: `cd backend && npm run dev`
4. 👉 Run: `cd frontend && npm start`

---

## If Script Doesn't Work

### Manual Option 1: Create Files in Editor

**Create `backend/.env`:**
```
DATABASE_URL=postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345678
PORT=5000
NODE_ENV=development
```

**Create `frontend/.env`:**
```
REACT_APP_API_URL=http://localhost:5000
```

### Manual Option 2: Terminal Commands

**Windows (PowerShell):**
```powershell
# Create backend/.env
@"
DATABASE_URL=postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345678
PORT=5000
NODE_ENV=development
"@ | Out-File -FilePath "backend\.env" -Encoding UTF8

# Create frontend/.env
@"
REACT_APP_API_URL=http://localhost:5000
"@ | Out-File -FilePath "frontend\.env" -Encoding UTF8
```

**Mac/Linux (Bash):**
```bash
# Create backend/.env
cat > backend/.env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345678
PORT=5000
NODE_ENV=development
EOF

# Create frontend/.env
cat > frontend/.env << 'EOF'
REACT_APP_API_URL=http://localhost:5000
EOF
```

---

## ✅ Verify Files Were Created

### Windows:
```powershell
Get-Content backend\.env
Get-Content frontend\.env
```

### Mac/Linux:
```bash
cat backend/.env
cat frontend/.env
```

You should see the environment variables displayed.

---

## 🚀 Next Steps

After `.env` files are created:

1. **Load Database Schema:**
   ```bash
   psql 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require' -f backend/database/schema.sql
   ```

2. **Load Sample Data:**
   ```bash
   psql 'postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require' -f backend/database/seed.sql
   ```

3. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

4. **Start Frontend (New Terminal):**
   ```bash
   cd frontend
   npm start
   ```

---

## 📝 Summary

| Step | Action | Command |
|------|--------|---------|
| 1 | Run setup script | `.\setup-env.ps1` (Windows) or `./setup-env.sh` (Mac/Linux) |
| 2 | Load schema | `psql '...' -f backend/database/schema.sql` |
| 3 | Load data | `psql '...' -f backend/database/seed.sql` |
| 4 | Start backend | `cd backend && npm run dev` |
| 5 | Start frontend | `cd frontend && npm start` |

---

**Ready?** Run the setup script now! 🚀
