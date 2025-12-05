# ProfLens AUC - API Endpoints Summary

## Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get current user profile |
| PUT | `/api/auth/profile` | Yes | Update user profile |
| PUT | `/api/auth/password` | Yes | Change password |

## Professor Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| GET | `/api/professors` | No | Get all professors (with filters) |
| GET | `/api/professors/search?q=query` | No | Search professors |
| GET | `/api/professors/:id` | No | Get single professor |
| POST | `/api/professors` | Admin | Create new professor |
| PUT | `/api/professors/:id` | Admin | Update professor |
| DELETE | `/api/professors/:id` | Admin | Delete professor |

## Course Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| GET | `/api/courses` | No | Get all courses (with filters) |
| GET | `/api/courses/search?q=query` | No | Search courses |
| GET | `/api/courses/:id` | No | Get single course |
| POST | `/api/courses` | Admin | Create new course |
| PUT | `/api/courses/:id` | Admin | Update course |
| DELETE | `/api/courses/:id` | Admin | Delete course |

## Review Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| GET | `/api/reviews` | No | Get all reviews (with filters) |
| GET | `/api/reviews/:id` | No | Get single review |
| POST | `/api/reviews` | Yes | Create new review |
| PUT | `/api/reviews/:id` | Yes | Update own review |
| DELETE | `/api/reviews/:id` | Yes | Delete own review |
| PUT | `/api/reviews/:id/helpful` | Yes | Toggle helpful mark |

## Query Parameters

### For GET /api/professors and /api/courses
- `department` - Filter by department code (e.g., csce)
- `search` - Text search
- `minRating` - Minimum rating filter (e.g., 4.0)
- `sortBy` - Sort field (overallRating, name, totalReviews)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

### For GET /api/reviews
- `type` - Filter by type (professor or course)
- `professorId` - Filter by professor ID
- `courseId` - Filter by course ID
- `sortBy` - Sort field (createdAt, rating, helpful)
- `page` - Page number
- `limit` - Items per page

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Optional success message",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 10,
  "total": 100,
  "totalPages": 10,
  "currentPage": 1,
  "data": {
    // Array of items
  }
}
```

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-token-here>
```

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Applies to all `/api/*` routes
