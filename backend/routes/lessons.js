const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT l.*, 
             COALESCE(lp.completed, false) as completed,
             COALESCE(lp.progress, 0) as progress
      FROM lessons l
      LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id
      ORDER BY l.order_index ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lessonResult = await db.query('SELECT * FROM lessons WHERE id = $1', [id]);
    if (lessonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const sectionsResult = await db.query(
      'SELECT * FROM lesson_sections WHERE lesson_id = $1 ORDER BY order_index ASC',
      [id]
    );

    const lesson = lessonResult.rows[0];
    lesson.sections = sectionsResult.rows;

    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Mark lesson as complete
router.post('/:id/complete', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await db.query(
      `INSERT INTO lesson_progress (user_id, lesson_id, completed, progress)
       VALUES ($1, $2, true, 100)
       ON CONFLICT (user_id, lesson_id) DO UPDATE
       SET completed = true, progress = 100, completed_at = NOW()`,
      [userId, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark lesson complete' });
  }
});

module.exports = router;
