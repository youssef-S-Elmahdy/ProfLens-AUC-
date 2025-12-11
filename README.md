# ProfLens AUC - Professor & Course Review Platform

A full-stack web application built for AUC students to review and rate professors and courses.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)

## 🎯 Features

- **User Authentication**: Secure JWT-based authentication for AUC students (@aucegypt.edu)
- **Professor Reviews**: Browse and review professors with ratings for teaching quality, difficulty, and more
- **Course Reviews**: Review courses with detailed feedback on workload, usefulness, and difficulty
- **Search & Filter**: Advanced search functionality to find professors and courses
- **Protected Routes**: Authenticated access to review submission and user profiles
- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS

## 📁 Project Structure

```
├── Milestone 1/          # Project proposal and planning documents
├── Milestone 2/          # Frontend prototype (static HTML/CSS/JS)
├── Milestone 3/          # Backend API (Express.js + MongoDB)
│   ├── config/          # Database and environment configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, validation, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── scripts/         # Database seeding scripts
│   └── server.js        # Entry point
├── Milestone 4/          # Full-stack integration (React + Backend)
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # React Context (Auth)
│   │   ├── pages/       # Page components
│   │   └── services/    # API integration layer
│   └── package.json
└── DEPLOYMENT_GUIDE.md  # Deployment instructions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/proflens-auc.git
cd proflens-auc
```

### 2. Setup Backend

```bash
cd "Milestone 3"
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/proflens
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EOF

# Seed database with sample data (optional)
npm run seed

# Start backend server
npm run dev
```

Backend will run on: http://localhost:5000

### 3. Setup Frontend

```bash
cd "../Milestone 4"
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm start
```

Frontend will run on: http://localhost:3000

### 4. Test the Application

1. Open http://localhost:3000
2. Sign up with an @aucegypt.edu email
3. Browse professors and courses
4. Submit reviews

## 🧪 Testing

### Test Account

After seeding the database:
- Email: `student@aucegypt.edu`
- Password: `password123`

## 📚 API Documentation

### Base URL
```
Local: http://localhost:5000/api
Production: https://your-backend.onrender.com/api
```

### Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

#### Professors
- `GET /api/professors` - Get all professors
- `GET /api/professors/:id` - Get single professor
- `GET /api/professors/search?q=query` - Search professors
- `POST /api/professors` - Create professor (admin only)

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `GET /api/courses/search?q=query` - Search courses

#### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review (protected)
- `GET /api/reviews/professor/:id` - Get professor reviews
- `GET /api/reviews/course/:id` - Get course reviews

## 🔧 Tech Stack

### Frontend
- React 18.2
- React Router 6.15
- Axios (API calls)
- Tailwind CSS
- React Icons

### Backend
- Node.js 20.x
- Express.js 4.18
- MongoDB with Mongoose 8.0
- JWT Authentication
- bcryptjs (password hashing)
- Winston (logging)
- Helmet (security)
- CORS
- Rate limiting

### DevOps & Deployment
- Git & GitHub
- Netlify (Frontend hosting)
- Render (Backend hosting)
- MongoDB Atlas (Database)

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

**Quick Summary:**
1. Deploy backend to Render
2. Deploy frontend to Netlify
3. Setup MongoDB Atlas
4. Configure environment variables

## 👥 Team

- **Youssef Elmahdy** - 900212370
- **Mariam Shoukry** - 900221804
- **Youssef Anan** - 900211132

## 📝 License

This project is created for educational purposes as part of AUC's Web-Based Systems course.

## 🙏 Acknowledgments

- American University in Cairo (AUC)
- Web-Based Systems Course Instructors
- All contributors and testers

---

**Note**: This application is designed exclusively for AUC students and requires an @aucegypt.edu email address for registration.
