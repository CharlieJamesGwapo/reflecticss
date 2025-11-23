# API Documentation

Complete API reference for the CSS Review Platform backend.

## Base URL

- Development: `http://localhost:5000`
- Production: `https://css-review-api.onrender.com`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses are JSON:

### Success Response
```json
{
  "data": {},
  "message": "Success"
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Verify Token
```
GET /api/auth/verify
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

### Lessons

#### Get All Lessons
```
GET /api/lessons
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "CSS Basics",
    "description": "Learn the fundamentals of CSS",
    "category": "basics",
    "duration": 15,
    "order_index": 1,
    "image_url": "https://...",
    "completed": false,
    "progress": 0,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Lesson by ID
```
GET /api/lessons/:id
```

**Response (200):**
```json
{
  "id": 1,
  "title": "CSS Basics",
  "description": "Learn the fundamentals of CSS",
  "category": "basics",
  "duration": 15,
  "order_index": 1,
  "image_url": "https://...",
  "sections": [
    {
      "id": 1,
      "lesson_id": 1,
      "title": "What is CSS?",
      "content": "CSS is used to style...",
      "code_example": "body { color: blue; }",
      "image_url": null,
      "order_index": 1
    }
  ]
}
```

#### Mark Lesson as Complete
```
POST /api/lessons/:id/complete
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true
}
```

---

### Quizzes

#### Get All Quizzes
```
GET /api/quizzes
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "CSS Basics Quiz",
    "description": "Test your knowledge of CSS fundamentals",
    "difficulty": "beginner",
    "time_limit": 10,
    "question_count": 5,
    "best_score": 80,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Quiz by ID with Questions
```
GET /api/quizzes/:id
```

**Response (200):**
```json
{
  "id": 1,
  "title": "CSS Basics Quiz",
  "description": "Test your knowledge of CSS fundamentals",
  "difficulty": "beginner",
  "time_limit": 10,
  "questions": [
    {
      "id": 1,
      "question": "What does CSS stand for?",
      "correct_choice_id": 1,
      "choices": [
        {
          "id": 1,
          "text": "Cascading Style Sheets"
        },
        {
          "id": 2,
          "text": "Computer Style Sheets"
        }
      ]
    }
  ]
}
```

#### Submit Quiz
```
POST /api/quizzes/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": {
    "1": 1,
    "2": 5,
    "3": 7
  }
}
```

**Response (200):**
```json
{
  "score": 80,
  "correctCount": 4,
  "totalQuestions": 5
}
```

---

### Flashcards

#### Get All Flashcards
```
GET /api/flashcards
```

**Response (200):**
```json
[
  {
    "id": 1,
    "question": "What is the CSS box model?",
    "answer": "The CSS box model consists of content, padding, border, and margin.",
    "category": "concepts",
    "times_reviewed": 5,
    "last_reviewed": "2024-01-15T10:30:00Z",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Mark Flashcard as Reviewed
```
POST /api/flashcards/:id/review
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true
}
```

---

### Users

#### Get User Statistics
```
GET /api/users/stats
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "lessonsCompleted": 5,
  "quizzesAttempted": 12,
  "averageScore": 85,
  "streakDays": 7
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid input or missing required fields |
| 401 | Unauthorized | Missing or invalid authentication token |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- 100 requests per minute per IP
- 1000 requests per hour per user

## Pagination

Pagination is not currently implemented. For large datasets, consider adding:

```
GET /api/lessons?page=1&limit=10
```

## Filtering

### Lessons
```
GET /api/lessons?category=basics
```

### Quizzes
```
GET /api/quizzes?difficulty=beginner
```

### Flashcards
```
GET /api/flashcards?category=concepts
```

## Sorting

Not currently implemented. Consider adding:

```
GET /api/lessons?sort=created_at&order=desc
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Lessons
```bash
curl http://localhost:5000/api/lessons
```

### Submit Quiz
```bash
curl -X POST http://localhost:5000/api/quizzes/1/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "1": 1,
      "2": 5
    }
  }'
```

## Testing with Postman

1. Import the API endpoints into Postman
2. Set up environment variables:
   - `base_url`: http://localhost:5000
   - `token`: Your JWT token
3. Use `{{base_url}}` and `{{token}}` in requests

## Webhooks

Not currently implemented. Consider adding for:
- Quiz completion notifications
- Lesson completion milestones
- Achievement unlocks

## Versioning

Current API version: v1

Future versions will be available at:
- `/api/v2/...`
- `/api/v3/...`

## CORS

CORS is enabled for:
- Development: `http://localhost:3000`
- Production: Your Vercel domain

## Rate Limiting (Future)

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1234567890
```

## Changelog

### v1.0.0
- Initial API release
- Authentication endpoints
- Lessons, quizzes, flashcards
- User statistics

## Support

For API issues:
1. Check the logs
2. Verify request format
3. Check authentication token
4. Review error messages
5. Contact support

## Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** in httpOnly cookies
3. **Validate input** on both client and server
4. **Handle errors gracefully** with proper status codes
5. **Use pagination** for large datasets
6. **Cache responses** when appropriate
7. **Monitor API usage** and performance
8. **Keep tokens short-lived** (7 days or less)
