# Setup Quiz History Table in Neon Database ✅

## 🎯 **Problem**
You don't have the `quiz_history` table in your Neon database, so quiz data isn't being saved.

## ✅ **Solution**
Create the `quiz_history` table in your Neon database using one of these methods.

---

## 📋 **Table Schema**

```sql
CREATE TABLE quiz_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  quiz_type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  archived_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔧 **Method 1: Using Neon Console (Easiest)**

### **Step 1: Open Neon Console**
1. Go to https://console.neon.tech
2. Login to your account
3. Select your project
4. Click "SQL Editor" in the left sidebar

### **Step 2: Create Table**
1. Click "New Query"
2. Copy and paste the SQL below:

```sql
CREATE TABLE IF NOT EXISTS quiz_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  quiz_type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  archived_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_quiz_history_user_id ON quiz_history(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_history_completed_at ON quiz_history(completed_at);
CREATE INDEX IF NOT EXISTS idx_quiz_history_archived_at ON quiz_history(archived_at);
```

3. Click "Execute"
4. You should see "✅ Success"

### **Step 3: Verify Table**
1. Click "New Query"
2. Paste this SQL:

```sql
SELECT * FROM information_schema.tables WHERE table_name = 'quiz_history';
```

3. Click "Execute"
4. You should see the quiz_history table listed

---

## 🔧 **Method 2: Using Migration Script**

### **Step 1: Run Migration**
```bash
cd backend
node migrations/create_quiz_history_table.js
```

### **Step 2: Check Output**
You should see:
```
Creating quiz_history table...
✅ quiz_history table created successfully
✅ Index on user_id created
✅ Index on completed_at created
✅ Index on archived_at created
✅ All indexes created successfully
✅ quiz_history table verified in database

📊 Table Structure:
────────────────────────────────────────────────────────────
  id                   | integer            | NOT NULL
  user_id              | integer            | NOT NULL
  quiz_type            | character varying  | NOT NULL
  category             | character varying  | NULLABLE
  score                | integer            | NOT NULL
  correct_answers      | integer            | NOT NULL
  total_questions      | integer            | NOT NULL
  completed_at         | timestamp          | NOT NULL
  archived_at          | timestamp          | NULLABLE
  created_at           | timestamp          | NOT NULL
────────────────────────────────────────────────────────────

✅ Migration completed successfully!
```

---

## 🔧 **Method 3: Using psql Command Line**

### **Step 1: Get Connection String**
1. Go to https://console.neon.tech
2. Select your project
3. Click "Connection String"
4. Copy the connection string

### **Step 2: Connect to Database**
```bash
psql "your_connection_string"
```

### **Step 3: Create Table**
Paste this SQL:

```sql
CREATE TABLE IF NOT EXISTS quiz_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  quiz_type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  archived_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_quiz_history_user_id ON quiz_history(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_history_completed_at ON quiz_history(completed_at);
CREATE INDEX IF NOT EXISTS idx_quiz_history_archived_at ON quiz_history(archived_at);
```

### **Step 4: Verify**
```sql
\dt quiz_history
```

You should see the table listed.

---

## 📊 **Table Structure**

| Column | Type | Constraint | Purpose |
|--------|------|-----------|---------|
| id | SERIAL | PRIMARY KEY | Unique identifier |
| user_id | INTEGER | NOT NULL, FK | User who took quiz |
| quiz_type | VARCHAR(50) | NOT NULL | COC1, COC2, COC3 |
| category | VARCHAR(100) | NULLABLE | Quiz category |
| score | INTEGER | NOT NULL | Score percentage (0-100) |
| correct_answers | INTEGER | NOT NULL | Number correct |
| total_questions | INTEGER | NOT NULL | Total questions |
| completed_at | TIMESTAMP | NOT NULL | When quiz was completed |
| archived_at | TIMESTAMP | NULLABLE | When quiz was archived |
| created_at | TIMESTAMP | DEFAULT NOW() | When record created |

---

## 🔍 **Verify Table Creation**

### **In Neon Console:**
```sql
-- Check if table exists
SELECT * FROM information_schema.tables WHERE table_name = 'quiz_history';

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'quiz_history'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname FROM pg_indexes WHERE tablename = 'quiz_history';
```

### **Expected Output:**
```
 column_name      | data_type            | is_nullable
──────────────────┼──────────────────────┼─────────────
 id               | integer              | NO
 user_id          | integer              | NO
 quiz_type        | character varying    | NO
 category         | character varying    | YES
 score            | integer              | NO
 correct_answers  | integer              | NO
 total_questions  | integer              | NO
 completed_at     | timestamp            | NO
 archived_at      | timestamp            | YES
 created_at       | timestamp            | NO
```

---

## ✅ **After Table Creation**

### **Step 1: Restart Backend**
```bash
cd backend
npm start
```

### **Step 2: Test Quiz Completion**
1. Login to your account
2. Take a quiz
3. Complete all questions
4. See completion alert
5. Check dashboard stats update

### **Step 3: Verify Data Saved**
1. Click "Progress" in navbar
2. You should see your completed quiz
3. Logout and login again
4. Stats should persist

---

## 🧪 **Testing Queries**

### **Check Quiz History**
```sql
SELECT * FROM quiz_history ORDER BY completed_at DESC LIMIT 10;
```

### **Get User Stats**
```sql
SELECT 
  user_id,
  COUNT(*) as quizzes_attempted,
  AVG(score) as average_score,
  MAX(score) as best_score,
  MIN(score) as worst_score
FROM quiz_history
GROUP BY user_id;
```

### **Get Recent Quizzes**
```sql
SELECT * FROM quiz_history
WHERE user_id = 1
AND archived_at IS NULL
ORDER BY completed_at DESC
LIMIT 10;
```

### **Get Archived Quizzes**
```sql
SELECT * FROM quiz_history
WHERE user_id = 1
AND archived_at IS NOT NULL
ORDER BY archived_at DESC;
```

---

## 🔐 **Indexes**

Three indexes are created for performance:

1. **idx_quiz_history_user_id** - Fast user lookups
2. **idx_quiz_history_completed_at** - Fast date range queries
3. **idx_quiz_history_archived_at** - Fast archive queries

These ensure fast queries even with thousands of quiz records.

---

## 📝 **Troubleshooting**

### **Issue: "relation quiz_history does not exist"**
**Solution:** Table hasn't been created yet. Follow Method 1 or 2 above.

### **Issue: "foreign key violation"**
**Solution:** Make sure user_id exists in users table before inserting.

### **Issue: "permission denied"**
**Solution:** Make sure you're using correct Neon credentials with proper permissions.

### **Issue: Table exists but endpoints don't work**
**Solution:** Restart backend server after table creation.

---

## 🎯 **Next Steps**

1. ✅ Create quiz_history table using Method 1, 2, or 3
2. ✅ Verify table exists in Neon console
3. ✅ Restart backend server
4. ✅ Take a quiz and complete it
5. ✅ Check dashboard stats update
6. ✅ Click Progress to see quiz history
7. ✅ Logout and login to verify persistence

---

## 📚 **Files Provided**

- `backend/migrations/create_quiz_history_table.js` - Migration script
- `backend/sql/create_quiz_history.sql` - SQL script
- This guide - Complete setup instructions

---

**Your quiz_history table is now ready!** ✅

Quiz data will now be saved to your Neon database and persist across sessions.

---

## 💡 **Quick Summary**

**Problem:** No quiz_history table in Neon database

**Solution:** Create table using one of three methods:
1. Neon Console (easiest)
2. Migration script
3. psql command line

**Result:** Quiz data now saved permanently in database

**Benefit:** Stats persist, history available, fully functional quiz system

---

**Ready to track quiz progress!** 🚀
