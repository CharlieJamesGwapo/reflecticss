-- COC 1 (Continuation) - Terms, Reviewers, and Quiz Questions Schema

-- Terms Table
CREATE TABLE IF NOT EXISTS coc1_terms (
  id SERIAL PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  term_name VARCHAR(255) NOT NULL,
  definition TEXT NOT NULL,
  example TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviewers Table
CREATE TABLE IF NOT EXISTS coc1_reviewers (
  id SERIAL PRIMARY KEY,
  reviewer_name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Questions Table
CREATE TABLE IF NOT EXISTS coc1_quiz_questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  difficulty VARCHAR(50) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Choices Table
CREATE TABLE IF NOT EXISTS coc1_quiz_choices (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES coc1_quiz_questions(id) ON DELETE CASCADE,
  choice_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Quiz Attempts Table
CREATE TABLE IF NOT EXISTS coc1_quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES coc1_quiz_questions(id) ON DELETE CASCADE,
  selected_choice_id INTEGER REFERENCES coc1_quiz_choices(id),
  is_correct BOOLEAN,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Progress Table
CREATE TABLE IF NOT EXISTS coc1_user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  score DECIMAL(5, 2) DEFAULT 0,
  last_attempted TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Create Indexes for Performance
CREATE INDEX idx_coc1_terms_category ON coc1_terms(category);
CREATE INDEX idx_coc1_reviewers_category ON coc1_reviewers(category);
CREATE INDEX idx_coc1_quiz_questions_category ON coc1_quiz_questions(category);
CREATE INDEX idx_coc1_quiz_choices_question ON coc1_quiz_choices(question_id);
CREATE INDEX idx_coc1_quiz_attempts_user ON coc1_quiz_attempts(user_id);
CREATE INDEX idx_coc1_quiz_attempts_question ON coc1_quiz_attempts(question_id);
CREATE INDEX idx_coc1_user_progress_user ON coc1_user_progress(user_id);
