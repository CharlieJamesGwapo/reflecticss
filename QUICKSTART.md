# Quick Start Guide

Get the CSS Review Platform up and running in 5 minutes.

## Local Development Setup

### 1. Clone or Extract the Project

```bash
cd quizlet
```

### 2. Set Up the Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```
DATABASE_URL=postgresql://localhost:5432/css_review
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### 3. Set Up the Database

Using PostgreSQL locally:

```bash
# Create database
createdb css_review

# Run schema
psql -d css_review -f database/schema.sql

# Seed data
psql -d css_review -f database/seed.sql
```

Or use Neon (cloud):
1. Sign up at https://neon.tech
2. Create a project and database
3. Copy the connection string to `DATABASE_URL`

### 4. Start the Backend

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 5. Set Up the Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

### 6. Start the Frontend

```bash
npm start
```

Frontend runs on `http://localhost:3000`

## Testing the Application

1. **Register**: Click "Login" → "Register" and create an account
2. **Browse Lessons**: Go to "Lessons" tab
3. **Take a Quiz**: Go to "Quizzes" and start a quiz
4. **Review Flashcards**: Go to "Flashcards" to review cards
5. **Check Dashboard**: View your progress on the dashboard

## Adding More Content

### Add a Lesson

```sql
INSERT INTO lessons (title, description, category, duration, order_index)
VALUES ('Advanced CSS', 'Learn advanced CSS techniques', 'advanced', 45, 7);

-- Get the lesson ID
SELECT id FROM lessons WHERE title = 'Advanced CSS';

-- Add sections (replace 7 with actual ID)
INSERT INTO lesson_sections (lesson_id, title, content, code_example, order_index)
VALUES (7, 'CSS Variables', 'Learn about CSS custom properties...', 'var(--color-primary)', 1);
```

### Add a Quiz

```sql
INSERT INTO quizzes (title, description, difficulty, time_limit)
VALUES ('CSS Variables Quiz', 'Test your CSS variables knowledge', 'intermediate', 10);

-- Get quiz ID
SELECT id FROM quizzes WHERE title = 'CSS Variables Quiz';

-- Add questions (replace 4 with actual ID)
INSERT INTO quiz_questions (quiz_id, question, order_index)
VALUES (4, 'What is the syntax for CSS variables?', 1);

-- Get question ID
SELECT id FROM quiz_questions WHERE quiz_id = 4;

-- Add choices (replace 10 with actual question ID)
INSERT INTO quiz_choices (question_id, text)
VALUES 
(10, '--variable-name'),
(10, '$variable-name'),
(10, '@variable-name'),
(10, '#variable-name');

-- Update correct answer (choice ID 1 is correct)
UPDATE quiz_questions SET correct_choice_id = 1 WHERE id = 10;
```

### Add Flashcards

```sql
INSERT INTO flashcards (question, answer, category)
VALUES 
('What is CSS specificity?', 'A measure of how specific a CSS selector is', 'concepts'),
('What is the cascade in CSS?', 'The process of determining which styles apply to an element', 'concepts');
```

## Project Structure

```
quizlet/
├── frontend/              # React app
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── App.js        # Main app
│   │   └── index.css     # Global styles
│   └── package.json
├── backend/              # Express API
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── config/          # Database config
│   ├── database/        # SQL files
│   └── server.js        # Main server
└── README.md
```

## Common Commands

### Frontend
```bash
cd frontend
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
```

### Backend
```bash
cd backend
npm run dev        # Start with nodemon
npm start          # Start server
```

### Database
```bash
# Connect to database
psql -d css_review

# Run SQL file
psql -d css_review -f path/to/file.sql

# Backup database
pg_dump css_review > backup.sql

# Restore database
psql css_review < backup.sql
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres

# Create database if missing
createdb css_review

# Run schema again
psql -d css_review -f backend/database/schema.sql
```

### CORS Errors
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check backend CORS configuration
- Ensure backend is running

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Next Steps

1. **Customize Content**: Add your own lessons, quizzes, and flashcards
2. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
3. **Enhance**: Add features like user profiles, certificates, etc.
4. **Share**: Deploy and share with learners

## Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)

## Support

For issues:
1. Check the logs in terminal
2. Verify environment variables
3. Ensure all services are running
4. Check the README.md for more details

Happy learning! 🚀
