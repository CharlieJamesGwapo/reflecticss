const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT q.*,
             COUNT(qq.id) as question_count,
             COALESCE(MAX(qa.score), 0) as best_score
      FROM quizzes q
      LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
      LEFT JOIN quiz_attempts qa ON q.id = qa.quiz_id
      GROUP BY q.id
      ORDER BY q.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get quiz by ID with questions
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const quizResult = await db.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questionsResult = await db.query(`
      SELECT qq.id, qq.question, qq.correct_choice_id,
             json_agg(json_build_object('id', qc.id, 'text', qc.text)) as choices
      FROM quiz_questions qq
      LEFT JOIN quiz_choices qc ON qq.id = qc.question_id
      WHERE qq.quiz_id = $1
      GROUP BY qq.id, qq.correct_choice_id
      ORDER BY qq.order_index ASC
    `, [id]);

    const quiz = quizResult.rows[0];
    quiz.questions = questionsResult.rows;

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Submit quiz
router.post('/:id/submit', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    const userId = req.userId;

    // Get correct answers
    const questionsResult = await db.query(`
      SELECT id, correct_choice_id FROM quiz_questions WHERE quiz_id = $1
    `, [id]);

    let correctCount = 0;
    const questions = questionsResult.rows;

    questions.forEach(q => {
      if (answers[q.id] === q.correct_choice_id) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);

    // Save attempt
    await db.query(
      `INSERT INTO quiz_attempts (user_id, quiz_id, score, answers)
       VALUES ($1, $2, $3, $4)`,
      [userId, id, score, JSON.stringify(answers)]
    );

    res.json({ score, correctCount, totalQuestions: questions.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

module.exports = router;
