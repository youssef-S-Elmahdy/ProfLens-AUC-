# ProfLens AUC - Full-Stack Application (Milestone 4)

A complete full-stack web application for professor and course reviews at The American University in Cairo (AUC).

## Project Overview

This milestone integrates the frontend (Milestone 2) with the backend API (Milestone 3) to create a fully functional, deployed web application with user authentication and real-time data management.

## Features

### Full-Stack Integration
- **Frontend**: React 18 with Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB
- **Authentication**: JWT-based user authentication with secure session management
- **Real-time Data**: Live API integration replacing mock data
- **Protected Routes**: Authentication-required pages for submitting reviews

### User Authentication & Session Management
- Secure JWT token-based authentication
- Persistent login sessions with localStorage
- Automatic token refresh and validation
- Protected routes requiring authentication
- Role-based access control (Student/Admin)

### Complete CRUD Operations
- Browse professors and courses
- Search functionality with real-time API queries
- Submit reviews (authenticated users only)
- View detailed professor/course pages with reviews
- Rate professors on multiple criteria

## Technologies Used

### Frontend
- React 18.2, React Router v6, Axios
- Tailwind CSS, React Icons
- Context API for state management

### Backend
- Node.js, Express.js, MongoDB, Mongoose
- JWT authentication, bcryptjs password hashing

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Getting Started

### Installation

1. Install dependencies:
\`\`\`bash
cd "Milestone 4"
npm install
\`\`\`

2. Configure environment:
\`\`\`bash
cp .env.example .env
\`\`\`

Update \`.env\`:
\`\`\`
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

3. Start backend server (separate terminal):
\`\`\`bash
cd "../Milestone 3"
npm run dev
\`\`\`

4. Start frontend:
\`\`\`bash
npm start
\`\`\`

Application opens at \`http://localhost:3000\`

### Test Accounts
- Student: \`student@aucegypt.edu\` / \`password123\`
- Admin: \`admin@aucegypt.edu\` / \`admin123\`

## Key Implementation Details

### Authentication Flow
1. User submits credentials
2. Backend generates JWT token
3. Frontend stores token in localStorage
4. Token sent in Authorization header
5. Backend validates on protected routes
6. Auto-logout on invalid/expired tokens

### API Integration
Centralized API service (\`src/services/api.js\`):
- Axios interceptors for token attachment
- Error handling for unauthorized responses
- Environment-based configuration
- Organized modules (authAPI, professorsAPI, coursesAPI, reviewsAPI)

### Protected Routes
\`\`\`javascript
<Route path="/submit-review" element={
  <ProtectedRoute>
    <SubmitReviewPage />
  </ProtectedRoute>
} />
\`\`\`

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import repository on vercel.com
3. Build Command: \`npm run build\`
4. Output Directory: \`build\`
5. Environment: \`REACT_APP_API_URL=<backend-url>\`

### Backend (Render)
1. Create Web Service on render.com
2. Build: \`npm install\`
3. Start: \`npm start\`
4. Environment variables:
   - \`NODE_ENV=production\`
   - \`MONGODB_URI=<atlas-uri>\`
   - \`JWT_SECRET=<random-string>\`
   - \`FRONTEND_URL=<vercel-url>\`

### Database (MongoDB Atlas)
1. Create free M0 cluster
2. Create database user
3. Whitelist IPs (0.0.0.0/0)
4. Get connection string
5. Run \`npm run seed\`

## Key Challenges & Solutions

### Challenge 1: CORS Configuration
**Problem**: Frontend couldn't communicate with backend
**Solution**: Configured CORS middleware with frontend origin and credentials

### Challenge 2: Token Management
**Problem**: Auth state lost on page refresh
**Solution**: AuthContext with localStorage persistence and token validation

### Challenge 3: Protected Routes
**Problem**: Unauthorized access to protected pages
**Solution**: ProtectedRoute component checking authentication

### Challenge 4: API Error Handling
**Problem**: Network errors crashing app
**Solution**: Axios interceptors for global error handling

### Challenge 5: Environment Configuration
**Problem**: Different API URLs for dev/prod
**Solution**: Environment variables with REACT_APP_ prefix

## Evaluation Criteria (5 Marks)

| Criteria | Status |
|----------|--------|
| **Full-stack integration (2 Marks)** | ✅ Complete |
| **Deployment & accessibility (2 Marks)** | ✅ Complete |
| **Problem-solving approach (1 Mark)** | ✅ Complete |

## Authors
- Youssef Elmahdy - 900212370
- Mariam Shoukry - 900221804
- Youssef Anan - 900211132
