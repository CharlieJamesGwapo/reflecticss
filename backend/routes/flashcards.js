const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT fc.*, 
             COALESCE(fcp.times_reviewed, 0) as times_reviewed,
             COALESCE(fcp.last_reviewed, NULL) as last_reviewed
      FROM flashcards fc
      LEFT JOIN flashcard_progress fcp ON fc.id = fcp.flashcard_id
      ORDER BY fc.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// Mark flashcard as reviewed
router.post('/:id/review', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await db.query(
      `INSERT INTO flashcard_progress (user_id, flashcard_id, times_reviewed, last_reviewed)
       VALUES ($1, $2, 1, NOW())
       ON CONFLICT (user_id, flashcard_id) DO UPDATE
       SET times_reviewed = times_reviewed + 1, last_reviewed = NOW()`,
      [userId, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update flashcard progress' });
  }
});

module.exports = router;
