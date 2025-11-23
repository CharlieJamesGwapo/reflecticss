const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'reflecticsss/profiles',
      resource_type: 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      public_id: `profile_${req.userId}_${Date.now()}`
    };
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: ${allowedMimes.join(', ')}`));
    }
  }
});

// Get user stats
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Lessons completed
    const lessonsResult = await db.query(
      'SELECT COUNT(*) as count FROM lesson_progress WHERE user_id = $1 AND completed = true',
      [userId]
    );

    // Quizzes attempted (from quiz_history table)
    const quizzesResult = await db.query(
      'SELECT COUNT(*) as count FROM quiz_history WHERE user_id = $1',
      [userId]
    );

    // Average score (from quiz_history table)
    const scoreResult = await db.query(
      'SELECT AVG(score) as average FROM quiz_history WHERE user_id = $1',
      [userId]
    );

    // Streak (simplified - days with activity)
    const streakResult = await db.query(`
      SELECT COUNT(DISTINCT DATE(completed_at)) as days
      FROM quiz_history
      WHERE user_id = $1 AND completed_at >= NOW() - INTERVAL '30 days'
    `, [userId]);

    res.json({
      lessonsCompleted: parseInt(lessonsResult.rows[0].count || 0),
      quizzesAttempted: parseInt(quizzesResult.rows[0].count || 0),
      averageScore: Math.round(scoreResult.rows[0].average || 0),
      streakDays: parseInt(streakResult.rows[0].days || 0)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Update profile
router.put('/profile', verifyToken, (req, res, next) => {
  upload.single('profilePhoto')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ error: err.message || 'File upload failed' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email } = req.body;

    console.log('Profile update request:', { userId, name, email, hasFile: !!req.file });

    // Validation
    if (!name || !email) {
      console.log('Validation failed: missing name or email');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!name.trim() || !email.trim()) {
      console.log('Validation failed: empty name or email');
      return res.status(400).json({ error: 'Name and email cannot be empty' });
    }

    const profilePhoto = req.file ? req.file.path : null;
    console.log('Profile photo:', profilePhoto);

    let query, params;

    if (profilePhoto) {
      query = 'UPDATE users SET name = $1, email = $2, profile_photo = $3 WHERE id = $4 RETURNING id, email, name, profile_photo';
      params = [name.trim(), email.trim(), profilePhoto, userId];
    } else {
      query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, email, name, profile_photo';
      params = [name.trim(), email.trim(), userId];
    }

    console.log('Executing query:', query);
    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Profile updated successfully:', result.rows[0]);
    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Profile update error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
    res.status(500).json({ 
      error: 'Failed to update profile. Please try again.',
      details: error.message 
    });
  }
});

// Get quiz history
router.get('/quiz-history', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Create quiz_history table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS quiz_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quiz_type VARCHAR(50) NOT NULL,
        category VARCHAR(100),
        score INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        completed_at TIMESTAMP NOT NULL,
        archived_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Get recent quizzes (not archived)
    const historyResult = await db.query(
      `SELECT id, quiz_type, category, score, correct_answers, total_questions, completed_at
       FROM quiz_history
       WHERE user_id = $1 AND archived_at IS NULL
       ORDER BY completed_at DESC
       LIMIT 50`,
      [userId]
    );

    // Get archived quizzes
    const archivedResult = await db.query(
      `SELECT id, quiz_type, category, score, correct_answers, total_questions, completed_at, archived_at
       FROM quiz_history
       WHERE user_id = $1 AND archived_at IS NOT NULL
       ORDER BY archived_at DESC
       LIMIT 50`,
      [userId]
    );

    res.json({
      history: historyResult.rows,
      archived: archivedResult.rows
    });
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    res.status(500).json({ error: 'Failed to fetch quiz history' });
  }
});

// Archive quiz
router.post('/quiz-history/:id/archive', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await db.query(
      `UPDATE quiz_history
       SET archived_at = NOW()
       WHERE id = $1 AND user_id = $2
       RETURNING id, archived_at`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ success: true, quiz: result.rows[0] });
  } catch (error) {
    console.error('Error archiving quiz:', error);
    res.status(500).json({ error: 'Failed to archive quiz' });
  }
});

// Delete quiz
router.delete('/quiz-history/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await db.query(
      `DELETE FROM quiz_history
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ success: true, message: 'Quiz deleted' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

// Change password
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    console.log('Password change request for user:', userId);

    // Validate input
    if (!currentPassword || !newPassword) {
      console.log('Validation failed: missing passwords');
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      console.log('Validation failed: password too short');
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    if (currentPassword === newPassword) {
      console.log('Validation failed: passwords are the same');
      return res.status(400).json({ error: 'New password must be different from current password' });
    }

    // Get user
    const userResult = await db.query('SELECT password FROM users WHERE id = $1', [userId]);

    if (userResult.rows.length === 0) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, userResult.rows[0].password);

    if (!validPassword) {
      console.log('Invalid current password for user:', userId);
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    console.log('Password changed successfully for user:', userId);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Failed to change password',
      details: error.message 
    });
  }
});

module.exports = router;
