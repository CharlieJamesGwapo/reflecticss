# CSS Review Platform

A comprehensive, interactive platform for learning CSS fundamentals through lessons, quizzes, and flashcards. Built with React, Node.js/Express, and PostgreSQL.

## Features

- **Interactive Lessons**: Structured lessons covering CSS fundamentals (COC 1-4)
- **Dynamic Quizzes**: Test your knowledge with adaptive quizzes
- **Smart Flashcards**: Reinforce learning with spaced repetition
- **Progress Tracking**: Monitor your learning journey with detailed stats
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **User Authentication**: Secure login and registration
- **Real-time Feedback**: Instant quiz results and performance metrics

## Tech Stack

### Frontend
- **React 18**: Modern UI library
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client

### Backend
- **Node.js + Express**: RESTful API server
- **PostgreSQL (Neon)**: Cloud-hosted database
- **JWT**: Secure authentication
- **bcryptjs**: Password hashing

### Deployment
- **Frontend**: Vercel
- **Backend**: Render or Vercel Functions
- **Database**: Neon PostgreSQL

## Project Structure

```
quizlet/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Lessons.js
│   │   │   ├── LessonDetail.js
│   │   │   ├── Quizzes.js
│   │   │   ├── QuizDetail.js
│   │   │   └── Flashcards.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── lessons.js
│   │   ├── quizzes.js
│   │   ├── flashcards.js
│   │   └── users.js
│   ├── database/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL (or Neon account)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:
```
REACT_APP_API_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```
DATABASE_URL=postgresql://user:password@host:port/css_review
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

5. Set up the database:
```bash
# Connect to your PostgreSQL database and run:
psql -U user -d css_review -f database/schema.sql
psql -U user -d css_review -f database/seed.sql
```

6. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons/:id/complete` - Mark lesson as complete

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz with questions
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Flashcards
- `GET /api/flashcards` - Get all flashcards
- `POST /api/flashcards/:id/review` - Mark flashcard as reviewed

### Users
- `GET /api/users/stats` - Get user statistics

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend (Render)

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables
5. Deploy

### Database (Neon)

1. Create a Neon account at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Use it in your backend `.env` file

## Features Explained

### Dashboard
- Overview of learning progress
- Statistics (lessons completed, quizzes attempted, average score)
- Quick access to lessons, quizzes, and flashcards

### Lessons
- Structured lessons organized by category
- Multi-section lessons with code examples
- Progress tracking
- Mark lessons as complete

### Quizzes
- Multiple-choice questions
- Difficulty levels (beginner, intermediate, advanced)
- Instant feedback
- Score tracking and history

### Flashcards
- Question-answer format
- Shuffle functionality
- Category filtering
- Review tracking

## Customization

### Adding New Lessons

1. Insert into `lessons` table:
```sql
INSERT INTO lessons (title, description, category, duration, order_index)
VALUES ('New Lesson', 'Description', 'category', 30, 7);
```

2. Add sections to `lesson_sections` table:
```sql
INSERT INTO lesson_sections (lesson_id, title, content, code_example, order_index)
VALUES (7, 'Section Title', 'Content here', 'code example', 1);
```

### Adding New Quizzes

1. Insert quiz into `quizzes` table
2. Add questions to `quiz_questions` table
3. Add choices to `quiz_choices` table
4. Update `correct_choice_id` in questions

### Adding New Flashcards

```sql
INSERT INTO flashcards (question, answer, category)
VALUES ('Question?', 'Answer', 'category');
```

## Best Practices

- Always use environment variables for sensitive data
- Validate input on both frontend and backend
- Use HTTPS in production
- Implement rate limiting on API endpoints
- Regular database backups
- Monitor application performance

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check firewall settings
- Ensure PostgreSQL is running

### CORS Errors
- Update CORS settings in backend
- Verify frontend URL in backend configuration

### Authentication Issues
- Check JWT_SECRET is set correctly
- Verify token expiration time
- Clear browser cache and cookies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for educational purposes

## Support

For issues and questions, please open an issue on GitHub or contact support.

## Future Enhancements

- [ ] Social features (leaderboards, sharing)
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Mobile app
- [ ] Video tutorials
- [ ] Community forum
- [ ] Certificates of completion
"# reflecticss" 
"# reflecticss" 
