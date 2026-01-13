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

// Get user stats for dashboard
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Mock data for now to avoid database errors
    const mockStats = {
      lessonsCompleted: 12,
      quizzesAttempted: 8,
      averageScore: 85,
      streakDays: 5,
      totalStudyTime: 120,
      weeklyProgress: [
        { day: 'Mon', lessons: 3, quizzes: 2, score: 85 },
        { day: 'Tue', lessons: 5, quizzes: 3, score: 92 },
        { day: 'Wed', lessons: 2, quizzes: 4, score: 78 },
        { day: 'Thu', lessons: 4, quizzes: 2, score: 88 },
        { day: 'Fri', lessons: 6, quizzes: 5, score: 95 },
        { day: 'Sat', lessons: 3, quizzes: 1, score: 82 },
        { day: 'Sun', lessons: 1, quizzes: 0, score: 0 }
      ],
      monthlyProgress: [
        { week: 'Week 1', progress: 75, goal: 100 },
        { week: 'Week 2', progress: 82, goal: 100 },
        { week: 'Week 3', progress: 68, goal: 100 },
        { week: 'Week 4', progress: 90, goal: 100 }
      ],
      recentActivity: [
        { type: 'quiz', description: 'Completed COC 1 Quiz', score: 85, time: '2 hours ago', icon: 'CheckCircle' },
        { type: 'lesson', description: 'Started Operating Systems lesson', time: '5 hours ago', icon: 'BookOpen' },
        { type: 'achievement', description: 'Unlocked "Quiz Master" badge', time: '1 day ago', icon: 'Award' },
        { type: 'login', description: 'Logged in to dashboard', time: '30 minutes ago', icon: 'LogOut' },
        { type: 'review', description: 'Reviewed 50 flashcards', time: '2 days ago', icon: 'Eye' }
      ],
      achievements: [
        { id: 1, title: 'Fast Learner', description: 'Complete 10 lessons in one week', icon: 'Zap', unlocked: true, progress: 100 },
        { id: 2, title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: 'Award', unlocked: true, progress: 100 },
        { id: 3, title: 'Consistent Student', description: '7-day study streak', icon: 'Flame', unlocked: true, progress: 100 },
        { id: 4, title: 'High Scorer', description: 'Average score above 85%', icon: 'Target', unlocked: false, progress: 75 },
        { id: 5, title: 'Explorer', description: 'Try all COC modules', icon: 'Users', unlocked: false, progress: 30 }
      ],
      leaderboard: [
        { rank: 1, name: 'You', score: 2840, avatar: '', trend: 'up' },
        { rank: 2, name: 'Alice Chen', score: 2750, avatar: '', trend: 'up' },
        { rank: 3, name: 'Bob Smith', score: 2680, avatar: '', trend: 'down' },
        { rank: 4, name: 'Carol Davis', score: 2590, avatar: '', trend: 'stable' },
        { rank: 5, name: 'David Wilson', score: 2450, avatar: '', trend: 'down' }
      ],
      performanceMetrics: {
        accuracy: 85,
        speed: 4.2,
        consistency: 78,
        improvement: 15
      }
    };

    res.json(mockStats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Helper functions for dashboard data
const generateWeeklyProgress = (userId) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day: day.substring(0, 3),
    lessons: Math.floor(Math.random() * 5) + 1,
    quizzes: Math.floor(Math.random() * 3) + 1,
    score: Math.floor(Math.random() * 30) + 70
  }));
};

const generateMonthlyProgress = (userId) => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  return weeks.map(week => ({
    week: week,
    progress: Math.floor(Math.random() * 40) + 60,
    goal: 100
  }));
};

const generateRecentActivity = (userId) => {
  return [
    { type: 'quiz', description: 'Completed COC 1 Quiz', score: 85, time: '2 hours ago', icon: 'CheckCircle' },
    { type: 'lesson', description: 'Started Operating Systems lesson', time: '5 hours ago', icon: 'BookOpen' },
    { type: 'achievement', description: 'Unlocked "Quiz Master" badge', time: '1 day ago', icon: 'Award' },
    { type: 'login', description: 'Logged in to dashboard', time: '30 minutes ago', icon: 'LogOut' },
    { type: 'review', description: 'Reviewed 50 flashcards', time: '2 days ago', icon: 'Eye' }
  ];
};

const generateAchievements = (userId) => {
  return [
    { id: 1, title: 'Fast Learner', description: 'Complete 10 lessons in one week', icon: 'Zap', unlocked: true, progress: 100 },
    { id: 2, title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: 'Award', unlocked: true, progress: 100 },
    { id: 3, title: 'Consistent Student', description: '7-day study streak', icon: 'Flame', unlocked: true, progress: 100 },
    { id: 4, title: 'High Scorer', description: 'Average score above 85%', icon: 'Target', unlocked: false, progress: 75 },
    { id: 5, title: 'Explorer', description: 'Try all COC modules', icon: 'Users', unlocked: false, progress: 30 }
  ];
};

const generateLeaderboard = () => {
  return [
    { rank: 1, name: 'You', score: 2840, avatar: '', trend: 'up' },
    { rank: 2, name: 'Alice Chen', score: 2750, avatar: '', trend: 'up' },
    { rank: 3, name: 'Bob Smith', score: 2680, avatar: '', trend: 'down' },
    { rank: 4, name: 'Carol Davis', score: 2590, avatar: '', trend: 'stable' },
    { rank: 5, name: 'David Wilson', score: 2450, avatar: '', trend: 'down' }
  ];
};

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

// Get user activity
router.get('/activity', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const activity = generateRecentActivity(userId);
    res.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Get user achievements
router.get('/achievements', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const achievements = generateAchievements(userId);
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Get leaderboard
router.get('/leaderboard', verifyToken, async (req, res) => {
  try {
    const leaderboard = generateLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
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
