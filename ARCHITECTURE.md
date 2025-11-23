# CSS Review Platform - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              REACT FRONTEND (Vercel)                    │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │  Dashboard   │  │   Lessons    │  │   Quizzes    │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │ Flashcards   │  │   Navbar     │  │   Auth       │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │                                                          │   │
│  │  Tailwind CSS | React Router | Axios | Lucide Icons   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓ HTTP/REST                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    INTERNET / HTTPS                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  EXPRESS BACKEND (Render)                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    API Routes                            │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│  │  │ Auth Routes │  │ Lesson API  │  │ Quiz API    │     │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│  │  │Flashcard API│  │ User Stats  │  │ Health Check│     │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↓ SQL                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Middleware Layer                            │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│  │  │ JWT Auth    │  │ CORS        │  │ Validation  │     │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Node.js | Express | bcryptjs | JWT | PostgreSQL Driver        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    POSTGRESQL DATABASE                           │
│                      (Neon Cloud)                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Tables                                │  │
│  │                                                           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │  │
│  │  │  Users   │  │ Lessons  │  │ Quizzes  │  │Flashcds│ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │  │
│  │                                                           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │  │
│  │  │ Progress │  │ Attempts │  │ Sections │  │ Choices │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Indexes | Constraints | Relationships | Backups               │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

```
App
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   ├── User Menu
│   └── Mobile Hamburger
│
├── Dashboard
│   ├── Hero Section
│   ├── Stats Cards
│   │   ├── Lessons Completed
│   │   ├── Quizzes Attempted
│   │   ├── Average Score
│   │   └── Streak Days
│   └── Feature Cards
│       ├── Lessons Card
│       ├── Quizzes Card
│       └── Flashcards Card
│
├── Lessons
│   ├── Filter Buttons
│   └── Lesson Cards (Grid)
│       ├── Image
│       ├── Title
│       ├── Description
│       ├── Category Badge
│       ├── Duration
│       └── Progress Bar
│
├── LessonDetail
│   ├── Header
│   ├── Content Area
│   │   ├── Section Title
│   │   ├── Content Text
│   │   ├── Code Example
│   │   └── Images
│   ├── Section Indicators
│   └── Navigation Buttons
│
├── Quizzes
│   ├── Filter Buttons
│   └── Quiz Cards (Grid)
│       ├── Title
│       ├── Description
│       ├── Difficulty Badge
│       ├── Question Count
│       ├── Time Limit
│       └── Best Score
│
├── QuizDetail
│   ├── Progress Bar
│   ├── Question Display
│   ├── Answer Choices
│   │   └── Radio Buttons
│   ├── Navigation Buttons
│   └── Results Screen
│
└── Flashcards
    ├── Filter Buttons
    ├── Flashcard (Flippable)
    │   ├── Question Side
    │   └── Answer Side
    ├── Progress Indicator
    └── Control Buttons
        ├── Previous
        ├── Shuffle
        └── Next
```

## Backend API Structure

```
Express Server
│
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   ├── Error Handler
│   └── Auth Middleware
│
├── Routes
│   │
│   ├── /api/auth
│   │   ├── POST /register
│   │   ├── POST /login
│   │   └── GET /verify
│   │
│   ├── /api/lessons
│   │   ├── GET / (all lessons)
│   │   ├── GET /:id (single lesson)
│   │   └── POST /:id/complete
│   │
│   ├── /api/quizzes
│   │   ├── GET / (all quizzes)
│   │   ├── GET /:id (quiz with questions)
│   │   └── POST /:id/submit
│   │
│   ├── /api/flashcards
│   │   ├── GET / (all flashcards)
│   │   └── POST /:id/review
│   │
│   └── /api/users
│       └── GET /stats
│
└── Database Connection
    └── PostgreSQL Pool
```

## Database Schema

```
Users
├── id (PK)
├── email (UNIQUE)
├── password (hashed)
├── name
├── created_at
└── updated_at

Lessons
├── id (PK)
├── title
├── description
├── category
├── duration
├── order_index
├── image_url
├── created_at
└── updated_at

LessonSections
├── id (PK)
├── lesson_id (FK)
├── title
├── content
├── code_example
├── image_url
├── order_index
└── created_at

LessonProgress
├── id (PK)
├── user_id (FK)
├── lesson_id (FK)
├── completed
├── progress
├── completed_at
├── created_at
└── updated_at

Quizzes
├── id (PK)
├── title
├── description
├── difficulty
├── time_limit
├── created_at
└── updated_at

QuizQuestions
├── id (PK)
├── quiz_id (FK)
├── question
├── correct_choice_id (FK)
├── order_index
└── created_at

QuizChoices
├── id (PK)
├── question_id (FK)
├── text
└── created_at

QuizAttempts
├── id (PK)
├── user_id (FK)
├── quiz_id (FK)
├── score
├── answers (JSONB)
└── created_at

Flashcards
├── id (PK)
├── question
├── answer
├── category
├── created_at
└── updated_at

FlashcardProgress
├── id (PK)
├── user_id (FK)
├── flashcard_id (FK)
├── times_reviewed
├── last_reviewed
├── created_at
└── updated_at
```

## Data Flow Diagrams

### User Registration Flow

```
User Input (Email, Password, Name)
        ↓
Frontend Form Validation
        ↓
POST /api/auth/register
        ↓
Backend Validation
        ↓
Check Email Exists
        ↓
Hash Password (bcryptjs)
        ↓
Insert User in Database
        ↓
Generate JWT Token
        ↓
Return User + Token
        ↓
Store Token in localStorage
        ↓
Redirect to Dashboard
```

### Quiz Submission Flow

```
User Answers Questions
        ↓
Click Submit Quiz
        ↓
POST /api/quizzes/:id/submit
        ↓
Backend Receives Answers
        ↓
Fetch Correct Answers
        ↓
Compare Answers
        ↓
Calculate Score
        ↓
Save Attempt in Database
        ↓
Return Score
        ↓
Display Results Screen
```

### Lesson Completion Flow

```
User Reads Lesson
        ↓
Clicks Mark Complete
        ↓
POST /api/lessons/:id/complete
        ↓
Backend Receives Request
        ↓
Update lesson_progress
        ↓
Set completed = true
        ↓
Set progress = 100
        ↓
Return Success
        ↓
Update UI (Show checkmark)
```

## Authentication Flow

```
┌─────────────────────────────────────────┐
│         User Login/Register             │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Frontend: Send Credentials           │
│    POST /api/auth/register              │
│    POST /api/auth/login                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Backend: Validate & Hash Password    │
│    Create/Verify User                   │
│    Generate JWT Token                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Return Token to Frontend             │
│    {user, token}                        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Frontend: Store Token                │
│    localStorage.setItem('token', token) │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Subsequent Requests                  │
│    Authorization: Bearer <token>        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Backend: Verify Token                │
│    jwt.verify(token, SECRET)            │
│    Extract user ID                      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Process Request with User Context    │
│    Return Protected Resource            │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    PRODUCTION                            │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Vercel (Frontend)                       │    │
│  │  - React App                                    │    │
│  │  - Static Assets                               │    │
│  │  - CDN Distribution                            │    │
│  │  - Auto Scaling                                │    │
│  └─────────────────────────────────────────────────┘    │
│                      ↓                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Render (Backend)                        │    │
│  │  - Express Server                              │    │
│  │  - Node.js Runtime                             │    │
│  │  - Auto Scaling                                │    │
│  │  - Health Checks                               │    │
│  └─────────────────────────────────────────────────┘    │
│                      ↓                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Neon (Database)                         │    │
│  │  - PostgreSQL                                  │    │
│  │  - Automatic Backups                           │    │
│  │  - Connection Pooling                          │    │
│  │  - Monitoring                                  │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  React | Tailwind CSS | Lucide Icons   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         API Layer                       │
│  Express.js | REST API | JWT Auth      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  Route Handlers | Validation | Auth    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Data Access Layer               │
│  PostgreSQL Driver | Query Builder      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Database Layer                  │
│  PostgreSQL | Neon Cloud               │
└─────────────────────────────────────────┘
```

## Security Architecture

```
┌──────────────────────────────────────────┐
│         Frontend Security               │
│  - Input Validation                     │
│  - XSS Prevention                       │
│  - Secure Token Storage                 │
│  - HTTPS Only                           │
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│         Network Security                │
│  - HTTPS/TLS                            │
│  - CORS Protection                      │
│  - Rate Limiting                        │
│  - DDoS Protection                      │
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│         Backend Security                │
│  - JWT Verification                     │
│  - Input Validation                     │
│  - SQL Injection Prevention              │
│  - Error Handling                       │
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│         Database Security               │
│  - Password Hashing (bcryptjs)          │
│  - Encrypted Connections                │
│  - Access Control                       │
│  - Backups & Recovery                   │
└──────────────────────────────────────────┘
```

## Scalability Considerations

### Horizontal Scaling
- Multiple Render instances
- Load balancing
- Database connection pooling
- CDN for static assets

### Vertical Scaling
- Increase instance size
- Upgrade database tier
- Optimize queries
- Add caching layer

### Performance Optimization
- Database indexing
- Query optimization
- API response caching
- Frontend code splitting
- Image optimization

---

This architecture provides a solid foundation for a scalable, secure, and maintainable CSS learning platform.
