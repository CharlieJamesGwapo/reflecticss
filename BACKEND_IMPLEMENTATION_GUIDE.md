# Backend Implementation Guide - Navbar, Registration & Account Management

## 🎯 **Database Schema Updates**

### **1. Add Profile Photo Column**

```sql
-- Add profile_photo column to users table
ALTER TABLE users ADD COLUMN profile_photo VARCHAR(500);

-- Add timestamps if not exists
ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

### **2. Create Notifications Table**

```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

---

## 🔧 **Backend Routes Implementation**

### **1. Update Auth Routes**

**File: `backend/routes/auth.js`**

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const pool = require('../db');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Register with photo upload
router.post('/register', upload.single('profilePhoto'), async (req, res) => {
  const { email, password, name } = req.body;
  const profilePhoto = req.file ? `/uploads/profiles/${req.file.filename}` : null;

  try {
    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password, name, profile_photo) VALUES ($1, $2, $3, $4) RETURNING id, email, name, profile_photo',
      [email, hashedPassword, name, profilePhoto]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_photo: user.profile_photo
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_photo: user.profile_photo
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      'SELECT id, email, name, profile_photo FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
```

### **2. Create Users Routes**

**File: `backend/routes/users.js`**

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const pool = require('../db');
const auth = require('../middleware/auth');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.userId;

    // Get lessons completed
    const lessonsResult = await pool.query(
      'SELECT COUNT(*) FROM user_lessons WHERE user_id = $1 AND completed = true',
      [userId]
    );

    // Get quizzes attempted
    const quizzesResult = await pool.query(
      'SELECT COUNT(*) FROM user_quizzes WHERE user_id = $1',
      [userId]
    );

    // Get average score
    const scoreResult = await pool.query(
      'SELECT AVG(score) FROM user_quizzes WHERE user_id = $1',
      [userId]
    );

    // Get streak days (simplified - you can enhance this)
    const streakResult = await pool.query(
      'SELECT COUNT(DISTINCT DATE(created_at)) FROM user_quizzes WHERE user_id = $1 AND created_at >= NOW() - INTERVAL \'30 days\'',
      [userId]
    );

    res.json({
      lessonsCompleted: parseInt(lessonsResult.rows[0].count) || 0,
      quizzesAttempted: parseInt(quizzesResult.rows[0].count) || 0,
      averageScore: Math.round(parseFloat(scoreResult.rows[0].avg) || 0),
      streakDays: parseInt(streakResult.rows[0].count) || 0
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Update profile
router.put('/profile', auth, upload.single('profilePhoto'), async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email } = req.body;
    const profilePhoto = req.file ? `/uploads/profiles/${req.file.filename}` : null;

    let query, params;

    if (profilePhoto) {
      query = 'UPDATE users SET name = $1, email = $2, profile_photo = $3, updated_at = NOW() WHERE id = $4 RETURNING id, email, name, profile_photo';
      params = [name, email, profilePhoto, userId];
    } else {
      query = 'UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING id, email, name, profile_photo';
      params = [name, email, userId];
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.put('/change-password', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    // Get user
    const userResult = await pool.query(
      'SELECT password FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, userResult.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query(
      'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, userId]
    );

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router;
```

### **3. Create Notifications Routes**

**File: `backend/routes/notifications.js`**

```javascript
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Get notifications
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
      [userId]
    );

    const unreadResult = await pool.query(
      'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = false',
      [userId]
    );

    res.json({
      notifications: result.rows,
      unreadCount: parseInt(unreadResult.rows[0].count)
    });
  } catch (error) {
    console.error('Notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const notificationId = req.params.id;

    const result = await pool.query(
      'UPDATE notifications SET is_read = true, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *',
      [notificationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ notification: result.rows[0] });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// Create notification (for internal use)
router.post('/', auth, async (req, res) => {
  try {
    const { userId, title, message } = req.body;

    const result = await pool.query(
      'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, message]
    );

    res.json({ notification: result.rows[0] });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

module.exports = router;
```

### **4. Auth Middleware**

**File: `backend/middleware/auth.js`**

```javascript
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = auth;
```

### **5. Update Main Server File**

**File: `backend/server.js`**

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/coc1', require('./routes/coc1'));
// Add other routes...

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 📦 **Required npm Packages**

```bash
npm install multer bcryptjs jsonwebtoken dotenv cors express
```

---

## 🔑 **Environment Variables**

**File: `.env`**

```
DATABASE_URL=postgresql://user:password@localhost:5432/quizlet
JWT_SECRET=your_secret_key_here
PORT=5000
REACT_APP_API_URL=http://localhost:5000
```

---

## 📁 **Directory Structure**

```
backend/
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── notifications.js
│   └── coc1.js
├── middleware/
│   └── auth.js
├── uploads/
│   └── profiles/
├── db.js
├── server.js
└── .env
```

---

## ✅ **Testing Checklist**

- [ ] Database tables created
- [ ] Auth routes working (register with photo, login, verify)
- [ ] Users routes working (stats, profile update, password change)
- [ ] Notifications routes working (get, mark as read, create)
- [ ] File uploads working
- [ ] JWT tokens valid
- [ ] Error handling working
- [ ] Frontend integration successful

---

**Backend implementation complete!** ✅
