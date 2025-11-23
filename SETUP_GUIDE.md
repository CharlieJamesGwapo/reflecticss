# Complete Setup Guide

Step-by-step guide to set up the CSS Review Platform locally.

## Prerequisites

Before starting, ensure you have:
- Node.js 16+ installed ([Download](https://nodejs.org/))
- PostgreSQL 12+ installed ([Download](https://www.postgresql.org/download/))
- Git installed ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

### Verify Installation

```bash
node --version      # Should be v16 or higher
npm --version       # Should be v8 or higher
psql --version      # Should be v12 or higher
git --version       # Should be installed
```

## Step 1: Clone/Extract Project

```bash
# If you have git
git clone <repository-url>
cd quizlet

# Or extract the ZIP file and navigate to it
cd quizlet
```

## Step 2: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. **Start PostgreSQL service**
   - Windows: PostgreSQL should start automatically
   - Mac: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`

2. **Create database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE css_review;
   
   # Exit
   \q
   ```

3. **Run schema**
   ```bash
   psql -U postgres -d css_review -f backend/database/schema.sql
   ```

4. **Seed data**
   ```bash
   psql -U postgres -d css_review -f backend/database/seed.sql
   ```

5. **Verify**
   ```bash
   psql -U postgres -d css_review
   \dt  # List tables
   \q   # Exit
   ```

### Option B: Neon Cloud Database

1. **Sign up at https://neon.tech**
2. **Create a new project**
3. **Create a database named `css_review`**
4. **Copy the connection string**
   - It will look like: `postgresql://user:password@host/css_review`

## Step 3: Backend Setup

### 1. Navigate to backend
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
# Copy example file
cp .env.example .env

# Edit .env with your editor
# Windows: notepad .env
# Mac/Linux: nano .env
```

### 4. Configure .env

**For Local PostgreSQL:**
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/css_review
JWT_SECRET=your_secret_key_here_make_it_long_and_random
PORT=5000
NODE_ENV=development
```

**For Neon:**
```
DATABASE_URL=postgresql://user:password@host.neon.tech/css_review
JWT_SECRET=your_secret_key_here_make_it_long_and_random
PORT=5000
NODE_ENV=development
```

### 5. Generate JWT Secret
```bash
# On Windows (PowerShell)
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString()))

# On Mac/Linux
openssl rand -base64 32
```

### 6. Test backend
```bash
npm run dev
```

You should see:
```
Server running on port 5000
```

### 7. Test API
Open browser and visit: `http://localhost:5000/health`

You should see: `{"status":"OK"}`

## Step 4: Frontend Setup

### 1. Open new terminal and navigate to frontend
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env
```

### 4. Configure .env
```
REACT_APP_API_URL=http://localhost:5000
```

### 5. Start frontend
```bash
npm start
```

The app will open at `http://localhost:3000`

## Step 5: Test the Application

### 1. Register a new user
- Click "Login" button
- Click "Register"
- Fill in email, password, and name
- Click "Register"

### 2. Explore lessons
- Click "Lessons" in navigation
- Click on a lesson card
- Read through sections
- Click "Mark Complete"

### 3. Take a quiz
- Click "Quizzes" in navigation
- Click on a quiz
- Answer all questions
- Click "Submit Quiz"
- View your score

### 4. Review flashcards
- Click "Flashcards" in navigation
- Click cards to flip
- Use "Next" and "Previous" buttons
- Try "Shuffle" button

### 5. Check dashboard
- Click "Dashboard"
- View your statistics
- See progress overview

## Troubleshooting

### Database Connection Error

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution:**
1. Verify PostgreSQL is running
2. Check DATABASE_URL is correct
3. Verify database exists: `psql -U postgres -l`
4. Check username/password

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process on port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Verify backend is running
2. Check REACT_APP_API_URL in .env
3. Verify CORS is enabled in backend

### Database Schema Error

**Error:** `relation "users" does not exist`

**Solution:**
```bash
# Run schema again
psql -U postgres -d css_review -f backend/database/schema.sql

# Verify tables
psql -U postgres -d css_review
\dt
```

## Development Workflow

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

### Terminal 3: Database (if needed)
```bash
psql -U postgres -d css_review
```

## Common Tasks

### Add a Lesson

1. Connect to database:
```bash
psql -U postgres -d css_review
```

2. Insert lesson:
```sql
INSERT INTO lessons (title, description, category, duration, order_index)
VALUES ('New Lesson', 'Description', 'advanced', 45, 7);
```

3. Get lesson ID:
```sql
SELECT id FROM lessons WHERE title = 'New Lesson';
```

4. Add sections:
```sql
INSERT INTO lesson_sections (lesson_id, title, content, code_example, order_index)
VALUES (7, 'Section 1', 'Content here', 'code example', 1);
```

### Reset Database

```bash
# Drop database
psql -U postgres -c "DROP DATABASE css_review;"

# Create new database
psql -U postgres -c "CREATE DATABASE css_review;"

# Run schema
psql -U postgres -d css_review -f backend/database/schema.sql

# Seed data
psql -U postgres -d css_review -f backend/database/seed.sql
```

### View Database

```bash
# Connect
psql -U postgres -d css_review

# List tables
\dt

# View users
SELECT * FROM users;

# View lessons
SELECT * FROM lessons;

# Exit
\q
```

## Environment Variables Reference

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000 |

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@localhost/css_review |
| JWT_SECRET | Secret key for JWT tokens | random_string_here |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |

## Next Steps

1. **Customize Content**: Add your own lessons and quizzes
2. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Enhance**: Add new features
4. **Share**: Deploy and share with users

## Getting Help

### Check Logs
- Frontend: Browser console (F12)
- Backend: Terminal output
- Database: psql errors

### Common Resources
- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

### Debug Mode

**Frontend Debug:**
```bash
# Add to .env
REACT_APP_DEBUG=true
```

**Backend Debug:**
```bash
# Add logging to routes
console.log('Request:', req.body);
```

## Performance Tips

1. **Database**: Add indexes for frequently queried columns
2. **Frontend**: Use React DevTools to check performance
3. **Backend**: Monitor response times
4. **Cache**: Implement caching for static content

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] .env files are in .gitignore
- [ ] HTTPS is enabled (production)
- [ ] Input validation is in place
- [ ] SQL injection is prevented

## Useful Commands

```bash
# Frontend
npm start              # Start dev server
npm run build          # Build for production
npm test               # Run tests

# Backend
npm run dev            # Start with nodemon
npm start              # Start server

# Database
psql -U postgres       # Connect to PostgreSQL
createdb css_review    # Create database
dropdb css_review      # Delete database
pg_dump css_review > backup.sql  # Backup
psql css_review < backup.sql     # Restore
```

## File Locations

- Frontend: `./frontend/`
- Backend: `./backend/`
- Database Schema: `./backend/database/schema.sql`
- Database Seed: `./backend/database/seed.sql`
- Documentation: `./README.md`, `./DEPLOYMENT.md`, etc.

## Success Indicators

✅ Backend running on port 5000
✅ Frontend running on port 3000
✅ Database connected and populated
✅ Can register and login
✅ Can view lessons
✅ Can take quizzes
✅ Can review flashcards
✅ Dashboard shows stats

## Support

If you encounter issues:
1. Check this guide
2. Review error messages
3. Check logs
4. Verify environment setup
5. Consult documentation

Happy learning! 🚀
