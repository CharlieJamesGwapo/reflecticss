-- Create quiz_history table for storing quiz completion records
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_history_user_id ON quiz_history(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_history_completed_at ON quiz_history(completed_at);
CREATE INDEX IF NOT EXISTS idx_quiz_history_archived_at ON quiz_history(archived_at);

-- Verify table creation
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'quiz_history'
ORDER BY ordinal_position;
