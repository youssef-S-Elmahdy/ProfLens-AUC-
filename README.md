# ProfLens AUC - Professor & Course Review Platform

A comprehensive full-stack web application for AUC students to browse, search, and review professors and courses with detailed ratings and feedback.

[![Node.js](https://img.shields.io/badge/Node.js-20.19.6%20LTS-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)](https://expressjs.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black)](https://vercel.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Milestones](#project-milestones)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Security Features](#security-features)
- [Team](#team)

---

## 🎯 Overview

ProfLens AUC is a modern, full-stack web application that empowers students at The American University in Cairo (AUC) to make informed decisions about their academic journey. Students can:

- **Discover** top-rated professors and courses
- **Search** through comprehensive databases of faculty and courses
- **Review** professors and courses based on multiple criteria
- **Compare** ratings across different semesters and departments
- **Share** anonymous or attributed feedback with the community

Built with modern web technologies, ProfLens AUC features secure authentication, real-time data updates, and a responsive design that works seamlessly across all devices.

---

## ✨ Features

### 🔐 User Authentication & Authorization
- **JWT-based Authentication** - Secure token-based login system
- **AUC Email Validation** - Restricted to @aucegypt.edu addresses
- **Persistent Sessions** - Stay logged in across browser sessions
- **Protected Routes** - Authentication required for sensitive actions
- **Role-based Access** - Student and Admin user roles

### 👨‍🏫 Professor Management
- **Comprehensive Profiles** - Detailed professor information
- **Multi-criteria Ratings** - Clarity, helpfulness, engagement, workload, communication
- **Search & Filter** - Find professors by name, department, or rating
- **Department Organization** - Browse by academic department
- **Review History** - See all reviews for each professor

### 📚 Course Management
- **Complete Course Catalog** - All AUC courses with detailed information
- **Course Ratings** - Difficulty, workload, usefulness, content quality
- **Course Codes** - Standard AUC course numbering (e.g., CSCE2301)
- **Prerequisites** - Course requirement information
- **Professor Associations** - See which professors teach each course

### ⭐ Review System
- **Detailed Reviews** - Multi-dimensional rating system
- **Anonymous Option** - Submit reviews anonymously
- **Semester Tracking** - Reviews tagged with semester and year
- **Tag System** - Categorize reviews with custom tags
- **Helpful Voting** - Mark helpful reviews to aid other students
- **Report Function** - Flag inappropriate content

### 🔍 Search & Discovery
- **Real-time Search** - Instant results as you type
- **Advanced Filtering** - Filter by department, rating, semester
- **Sorting Options** - Sort by rating, date, or relevance
- **Top Performers** - Discover highest-rated professors and courses
- **Responsive UI** - Beautiful, mobile-first design

### 🎨 User Experience
- **Modern Interface** - Clean, intuitive design with AUC branding
- **Loading States** - Skeleton screens for better perceived performance
- **Error Handling** - Clear, user-friendly error messages
- **Success Feedback** - Notifications for successful actions
- **Accessibility** - WCAG-compliant design patterns

---

## 📁 Project Milestones

This project was developed in four progressive milestones:

### Milestone 1: Project Planning & Proposal
**Status:** ✅ Complete

- Project proposal document
- System requirements analysis
- Database schema design
- User interface wireframes
- Technology stack selection
- Team roles and responsibilities

**Key Deliverables:**
- Project proposal document
- Initial wireframes
- Database schema diagrams

---

### Milestone 2: Frontend Prototype
**Status:** ✅ Complete

- Static frontend implementation
- HTML5 semantic structure
- CSS3 styling with responsive design
- Vanilla JavaScript interactions
- Mock data for testing
- UI/UX design implementation

**Key Deliverables:**
- Login/Registration pages
- Homepage with top professors/courses
- Search functionality
- Professor/Course detail pages
- Review submission forms
- Responsive layout

**Technologies:** HTML5, CSS3, Vanilla JavaScript

---

### Milestone 3: Backend API Development
**Status:** ✅ Complete

**Location:** `/Milestone 3/`

A complete RESTful API backend with:

- **4+ Database Entities:** Users, Professors, Courses, Reviews
- **20+ API Endpoints:** CRUD operations for all entities
- **JWT Authentication:** Secure token-based auth
- **Middleware Stack:** Error handling, logging, validation, security
- **Rating Aggregation:** Automatic calculation of average ratings
- **Search Functionality:** Full-text search across entities
- **Data Validation:** Input sanitization and validation

**Key Components:**
- Express.js server with RESTful architecture
- MongoDB database with Mongoose ODM
- bcryptjs password hashing (10 salt rounds)
- Winston logging system
- Helmet security headers
- CORS configuration
- Rate limiting on auth endpoints
- express-validator input validation

**API Endpoints:**
```
Authentication:     POST /api/auth/register, /api/auth/login, GET /api/auth/me
Professors:         GET, POST, PUT, DELETE /api/professors
Courses:            GET, POST, PUT, DELETE /api/courses
Reviews:            GET, POST, PUT, DELETE /api/reviews
Search:             GET /api/professors/search, /api/courses/search
Health Check:       GET /api/health
```

**Evaluation:** 10/10 Marks
- Functionality & API design: 4/4
- Database schema & data handling: 4/4
- Code quality & security: 2/2

**Documentation:** See [Milestone 3/README.md](./Milestone%203/README.md)

---

### Milestone 4: Full-Stack Integration & Deployment
**Status:** ✅ Complete

**Location:** `/Milestone 4/`

Complete integration of frontend and backend with:

- **React 18 Frontend:** Modern, component-based architecture
- **API Integration:** Axios with interceptors for seamless backend communication
- **State Management:** React Context API for global auth state
- **Protected Routes:** Route guards for authenticated pages
- **Real-time Data:** Live updates from MongoDB via Express API
- **Production Deployment:** Vercel for both frontend and backend

**Major Implementations:**
- JWT token management with localStorage persistence
- Axios interceptors for automatic token attachment
- Error boundary and global error handling
- Protected route components
- Context API for authentication state
- Environment-based configuration

**Critical Bug Fixes:**
1. ✅ HomePage migration from mock data to live API
2. ✅ MongoDB ID compatibility (_id vs id)
3. ✅ Review submission validation errors
4. ✅ Reviews not displaying after creation
5. ✅ Node.js version compatibility (v20.19.6 LTS)
6. ✅ MongoDB service management on macOS Sequoia

**Evaluation:** 5/5 Marks
- Full-stack integration: 2/2
- Deployment & accessibility: 2/2
- Problem-solving approach: 1/1

**Documentation:** See [Milestone 4/README.md](./Milestone%204/README.md)

---

## 🔧 Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library for component-based architecture |
| React Router | 6.20.0 | Client-side routing and navigation |
| Axios | 1.5.0 | HTTP client for API requests |
| Tailwind CSS | 3.3.5 | Utility-first CSS framework |
| React Icons | 4.12.0 | Icon library (Font Awesome, etc.) |
| Lodash | 4.17.21 | Utility functions for data manipulation |
| React Scripts | 5.0.1 | Create React App tooling |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.19.6 LTS | JavaScript runtime environment |
| Express.js | 4.18.2 | Web application framework |
| MongoDB | 8.0+ | NoSQL database |
| Mongoose | 8.0.3 | MongoDB object modeling (ODM) |
| JSON Web Token | 9.0.2 | Authentication tokens |
| bcryptjs | 2.4.3 | Password hashing |
| express-validator | 7.0.1 | Input validation middleware |
| Helmet | 7.1.0 | Security headers |
| Morgan | 1.10.0 | HTTP request logger |
| Winston | 3.11.0 | Application logging |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| express-rate-limit | 7.1.5 | API rate limiting |
| dotenv | 16.3.1 | Environment variable management |

### Development Tools
| Tool | Purpose |
|------|---------|
| nodemon | Auto-restart server on file changes |
| PostCSS | CSS transformations |
| Autoprefixer | Automatic CSS vendor prefixing |
| Git | Version control |
| npm | Package management |

### Deployment & Hosting
| Service | Purpose |
|---------|---------|
| Vercel | Frontend and Backend hosting (serverless) |
| MongoDB Atlas | Cloud database hosting |
| GitHub | Code repository and version control |

---

## 📂 Project Structure

```
Web Based Systems/Project/
│
├── Milestone 1/                    # Project Planning & Proposal
│   ├── proposal.pdf
│   ├── wireframes/
│   └── diagrams/
│
├── Milestone 2/                    # Frontend Prototype (Static)
│   ├── index.html
│   ├── login.html
│   ├── professor-review.html
│   ├── course-review.html
│   ├── submit-review.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── mockData.js
│   └── README.md
│
├── Milestone 3/                    # Backend API
│   ├── config/
│   │   └── database.js            # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── professorController.js # Professor CRUD
│   │   ├── courseController.js    # Course CRUD
│   │   └── reviewController.js    # Review CRUD
│   ├── middleware/
│   │   ├── auth.js                # JWT authentication
│   │   ├── errorHandler.js        # Error handling
│   │   └── validator.js           # Input validation
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Professor.js           # Professor schema
│   │   ├── Course.js              # Course schema
│   │   └── Review.js              # Review schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints
│   │   ├── professors.js          # Professor endpoints
│   │   ├── courses.js             # Course endpoints
│   │   └── reviews.js             # Review endpoints
│   ├── scripts/
│   │   └── seedDatabase.js        # Database seeding
│   ├── utils/
│   │   └── logger.js              # Winston logger
│   ├── logs/                      # Log files (gitignored)
│   ├── .env                       # Environment variables (gitignored)
│   ├── .env.example               # Environment template
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                  # Main entry point
│   ├── vercel.json                # Vercel config
│   └── README.md                  # Backend documentation
│
├── Milestone 4/                    # Full-Stack Integration
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── Button.jsx         # Reusable button
│   │   │   ├── ProfessorCard.jsx  # Professor display card
│   │   │   └── CourseCard.jsx     # Course display card
│   │   ├── pages/
│   │   │   ├── HomePage.jsx       # Landing page
│   │   │   ├── LoginPage.jsx      # Login form
│   │   │   ├── RegisterPage.jsx   # Registration form
│   │   │   ├── SearchResultsPage.jsx # Search results
│   │   │   ├── ProfessorReviewPage.jsx # Professor details
│   │   │   ├── CourseReviewPage.jsx # Course details
│   │   │   ├── SubmitReviewPage.jsx # Review form
│   │   │   └── AccountPage.jsx    # User account
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── services/
│   │   │   └── api.js             # Axios + API methods
│   │   ├── App.js                 # Main app component
│   │   ├── App.css                # Global styles
│   │   ├── index.js               # React entry point
│   │   └── index.css              # Tailwind directives
│   ├── .env                       # Environment variables (gitignored)
│   ├── .env.example               # Environment template
│   ├── package.json               # Dependencies
│   ├── tailwind.config.js         # Tailwind configuration
│   └── README.md                  # Frontend documentation
│
├── README.md                       # This file (main documentation)
└── .gitignore                      # Git ignore rules
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.19.6 LTS or higher ([Download](https://nodejs.org/))
- **MongoDB**: Local installation or MongoDB Atlas account ([Setup Guide](https://www.mongodb.com/docs/manual/installation/))
- **npm**: v9+ (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))

### Installation Steps

#### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/proflens-auc.git

# Navigate to project directory
cd "Web Based Systems/Project"
```

#### 2. Backend Setup (Milestone 3)

```bash
# Navigate to backend directory
cd "Milestone 3"

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env` file with your configuration:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/proflens_auc
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Start MongoDB (macOS with Homebrew):**
```bash
# Start MongoDB service
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
# Should show: mongodb-community started
```

**Seed the database with sample data:**
```bash
npm run seed
```

**Expected output:**
```
✓ Connected to MongoDB
✓ Database cleared
✓ Created 2 users
✓ Created 10 professors
✓ Created 15 courses
✓ Created 25 reviews
✓ Database seeded successfully!
```

**Start the backend server:**
```bash
# Development mode with auto-reload
npm run dev

# Backend will run on http://localhost:5000
```

**Verify backend is running:**
```bash
curl http://localhost:5000/api/health
# Expected: {"status":"ok"}
```

#### 3. Frontend Setup (Milestone 4)

**Open a new terminal window/tab:**

```bash
# Navigate to frontend directory
cd "Milestone 4"

# Install dependencies (may take a few minutes)
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the frontend development server
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

#### 4. Test the Application

1. **Login with test account:**
   - Email: `student@aucegypt.edu`
   - Password: `password123`

2. **Or register a new account:**
   - Use any @aucegypt.edu email
   - Create a secure password

3. **Explore features:**
   - Browse top professors and courses on homepage
   - Search for specific professors or courses
   - View detailed profiles with ratings
   - Submit your own reviews
   - Mark helpful reviews
   - Manage your account

---

## 📚 API Documentation

### Base URL

```
Development:  http://localhost:5000/api
Production:   https://your-backend.vercel.app/api
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints Overview

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/update-profile` | Update user profile | Yes |

#### Professor Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/professors` | Get all professors | No |
| GET | `/api/professors/:id` | Get professor by ID | No |
| GET | `/api/professors/search?q=query` | Search professors | No |
| POST | `/api/professors` | Create professor | Yes (Admin) |
| PUT | `/api/professors/:id` | Update professor | Yes (Admin) |
| DELETE | `/api/professors/:id` | Delete professor | Yes (Admin) |

#### Course Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | Get all courses | No |
| GET | `/api/courses/:id` | Get course by ID | No |
| GET | `/api/courses/search?q=query` | Search courses | No |
| POST | `/api/courses` | Create course | Yes (Admin) |
| PUT | `/api/courses/:id` | Update course | Yes (Admin) |
| DELETE | `/api/courses/:id` | Delete course | Yes (Admin) |

#### Review Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/reviews` | Get all reviews | No |
| GET | `/api/reviews?type=professor&professorId=ID` | Get professor reviews | No |
| GET | `/api/reviews?type=course&courseId=ID` | Get course reviews | No |
| POST | `/api/reviews` | Create review | Yes |
| PUT | `/api/reviews/:id` | Update review | Yes (Owner/Admin) |
| DELETE | `/api/reviews/:id` | Delete review | Yes (Owner/Admin) |
| PUT | `/api/reviews/:id/helpful` | Mark review helpful | Yes |

### Query Parameters

**Pagination:**
```
?page=1&limit=20
```

**Sorting:**
```
?sortBy=overallRating&order=desc
```

**Filtering:**
```
?department=csce&minRating=4.0
```

### Example Requests

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@aucegypt.edu",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe",
    "major": "Computer Science",
    "graduationYear": 2025
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@aucegypt.edu",
    "password": "password123"
  }'
```

**Get professors (with authentication):**
```bash
curl http://localhost:5000/api/professors \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Submit a review:**
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "professor",
    "professorId": "PROFESSOR_ID",
    "rating": 5,
    "clarity": 5,
    "helpfulness": 5,
    "engagement": 4,
    "comment": "Excellent professor! Very clear explanations.",
    "semester": "Fall",
    "year": 2024,
    "anonymous": false
  }'
```

---

## 🌐 Deployment

### Deployment Platform: Vercel (Recommended)

Vercel provides seamless deployment for both frontend and backend with automatic HTTPS, CDN, and serverless functions.

### Prerequisites

- GitHub account
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

### Step 1: MongoDB Atlas Setup

1. **Create a free cluster:**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up and create a new project
   - Create a free M0 cluster (512MB)

2. **Create database user:**
   - Database Access → Add New Database User
   - Choose password authentication
   - Set username and strong password
   - User Privileges: Read and write to any database

3. **Configure network access:**
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere) for production
   - Or add specific IP ranges for better security

4. **Get connection string:**
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/proflens_auc?retryWrites=true&w=majority`

### Step 2: Backend Deployment to Vercel

1. **Prepare backend for deployment:**

Create `Milestone 3/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. **Deploy to Vercel:**

```bash
cd "Milestone 3"

# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set up and deploy
```

3. **Configure environment variables:**

In Vercel dashboard → Project → Settings → Environment Variables, add:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/proflens_auc
JWT_SECRET=your-production-jwt-secret-min-256-bits
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
```

4. **Note your backend URL:**
```
https://your-backend.vercel.app
```

### Step 3: Seed Production Database

```bash
# In Milestone 3 directory
export MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/proflens_auc"

npm run seed
```

### Step 4: Frontend Deployment to Vercel

1. **Update environment variables:**

Create `Milestone 4/.env.production`:
```env
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

2. **Deploy to Vercel:**

```bash
cd "Milestone 4"

# Deploy
vercel

# Follow prompts
# Note: Vercel auto-detects Create React App
```

3. **Configure environment variables:**

In Vercel dashboard → Project → Settings → Environment Variables:
```
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

4. **Your app is live:**
```
https://your-frontend.vercel.app
```

### Step 5: Update CORS Configuration

Update `Milestone 3/server.js` with your production frontend URL:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
```

Redeploy backend with `vercel --prod`

### Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with strong password
- [ ] Network access configured (0.0.0.0/0)
- [ ] Production database seeded with initial data
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables configured
- [ ] Backend health check working: `https://your-backend.vercel.app/api/health`
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables configured
- [ ] CORS configured with production frontend URL
- [ ] Test login and registration working
- [ ] Test review submission working
- [ ] All API endpoints accessible

### Monitoring & Maintenance

**Vercel Dashboard provides:**
- Real-time deployment logs
- Analytics and usage metrics
- Custom domains
- Automatic SSL certificates
- Environment variable management
- Rollback capability

**MongoDB Atlas provides:**
- Database metrics and monitoring
- Automatic backups
- Performance insights
- Query optimization suggestions

---

## 🧪 Testing

### Manual Testing

#### Test Accounts (After Seeding)

**Student Account:**
- Email: `student@aucegypt.edu`
- Password: `password123`

**Admin Account:**
- Email: `admin@aucegypt.edu`
- Password: `admin123`

#### Testing Checklist

**Authentication:**
- [ ] Register with AUC email succeeds
- [ ] Register with non-AUC email fails
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails
- [ ] Logout clears session
- [ ] Session persists on page refresh
- [ ] Protected routes redirect to login when not authenticated

**Professors:**
- [ ] View all professors on homepage
- [ ] Search professors by name
- [ ] Filter professors by department
- [ ] Click professor card navigates to detail page
- [ ] Professor ratings display correctly
- [ ] Professor reviews load properly

**Courses:**
- [ ] View all courses on homepage
- [ ] Search courses by name or code
- [ ] Filter courses by department
- [ ] Click course card navigates to detail page
- [ ] Course ratings display correctly
- [ ] Course reviews load properly

**Reviews:**
- [ ] Submit professor review (authenticated)
- [ ] Submit course review (authenticated)
- [ ] Review appears on detail page
- [ ] Anonymous reviews hide user information
- [ ] Mark review as helpful increments count
- [ ] Filter reviews by semester works
- [ ] Sort reviews by rating/date works

**Error Handling:**
- [ ] Network errors show friendly messages
- [ ] Form validation displays errors
- [ ] 404 pages display appropriately
- [ ] Backend offline shows connection error

### API Testing with Postman

Import this collection to test all endpoints:

```json
{
  "info": {
    "name": "ProfLens AUC API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@aucegypt.edu\",\n  \"password\": \"test123\",\n  \"firstName\": \"Test\",\n  \"lastName\": \"User\",\n  \"major\": \"CS\",\n  \"graduationYear\": 2025\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "register"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## 🔒 Security Features

### Implemented Security Measures

1. **Authentication & Authorization**
   - JWT tokens with 7-day expiration
   - Bcrypt password hashing (10 salt rounds)
   - AUC email domain restriction (@aucegypt.edu)
   - Role-based access control (Student/Admin)

2. **Input Validation**
   - express-validator on all inputs
   - MongoDB query sanitization
   - XSS protection through sanitization
   - SQL injection prevention (NoSQL database)

3. **HTTP Security**
   - Helmet.js security headers
   - CORS with specific origin whitelist
   - Rate limiting on authentication endpoints
   - HTTPS enforced in production

4. **Data Protection**
   - Passwords never stored in plain text
   - Sensitive data excluded from API responses
   - Environment variables for secrets
   - Secure cookie flags in production

5. **API Security**
   - Request rate limiting
   - Token validation on protected routes
   - Owner-only edit/delete for reviews
   - Admin-only routes for management

### Security Best Practices

- **Regular Updates:** Keep dependencies updated with `npm audit`
- **Strong Secrets:** Use 256-bit random strings for JWT_SECRET
- **HTTPS Only:** Enforce HTTPS in production
- **IP Whitelisting:** Restrict MongoDB Atlas access
- **Logging:** Monitor application logs for suspicious activity
- **Backup:** Regular database backups via MongoDB Atlas

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start - MongoDB connection error:**
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongosh "mongodb://localhost:27017/proflens_auc"
```

**Frontend shows "Cannot connect to backend":**
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`
- Check browser console for CORS errors
- Verify backend CORS configuration

**Reviews not displaying:**
- Check browser console for errors
- Verify backend is returning data:
  ```bash
  curl "http://localhost:5000/api/reviews?type=professor&professorId=ID"
  ```
- Ensure frontend is accessing correct data path: `data.data.reviews`

**Login not working:**
- Verify email ends with @aucegypt.edu
- Check backend logs for authentication errors
- Ensure JWT_SECRET is set in backend `.env`
- Clear localStorage and try again

---

## 👥 Team

**Course:** Web-Based Systems
**Institution:** The American University in Cairo (AUC)
**Semester:** Fall 2024

**Team Members:**
- **Youssef Elmahdy** - 900212370
  - Full-stack development
  - Backend architecture
  - Database design

- **Mariam Shoukry** - 900221804
  - Frontend development
  - UI/UX design
  - Testing & QA

- **Youssef Anan** - 900211132
  - API development
  - Security implementation
  - Deployment

---

## 📊 Project Statistics

- **Total Lines of Code:** ~15,000+
- **API Endpoints:** 20+
- **Database Models:** 4
- **React Components:** 15+
- **Development Time:** 12 weeks
- **Commits:** 100+

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- **Full-Stack Development:** Building complete web applications from database to UI
- **RESTful API Design:** Creating scalable, maintainable backend services
- **Authentication & Security:** Implementing secure user systems
- **Database Design:** Modeling complex relationships in NoSQL
- **Frontend Frameworks:** Building reactive UIs with React
- **Deployment:** Deploying production applications to cloud platforms
- **Version Control:** Collaborative development with Git
- **Documentation:** Writing comprehensive technical documentation

---

## 📝 License

This project is created for educational purposes as part of AUC's Web-Based Systems course. All rights reserved.

---

## 🙏 Acknowledgments

- **American University in Cairo (AUC)** - For providing the opportunity to develop this project
- **Web-Based Systems Course Instructors** - For guidance and support throughout development
- **MongoDB University** - For excellent database resources and tutorials
- **React Documentation** - For comprehensive guides and best practices
- **Express.js Community** - For middleware examples and patterns
- **Vercel** - For excellent deployment platform and documentation

---

## 📞 Contact

For questions, issues, or contributions:

- **Email:** Contact team members via AUC email addresses
- **Issues:** Open an issue in the GitHub repository
- **Documentation:** Refer to milestone-specific README files for detailed information

---

## 🔗 Related Documentation

- [Milestone 3 README - Backend API](./Milestone%203/README.md)
- [Milestone 4 README - Full-Stack Integration](./Milestone%204/README.md)
- [API Documentation](#api-documentation)
- [Deployment Guide](#deployment)

---

**Project Completion Date:** December 12, 2024
**Final Version:** 1.0.0
**Status:** ✅ Production Ready

---

**Note:** This application is designed exclusively for AUC students and requires an @aucegypt.edu email address for registration.
