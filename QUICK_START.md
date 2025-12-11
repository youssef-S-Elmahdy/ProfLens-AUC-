# Quick Start Guide - ProfLens AUC

## ⚠️ IMPORTANT: You MUST start the backend server first!

The "Registration failed" error you're seeing is because **the backend server is not running**.

## 🚀 Option 1: Automatic Start (Recommended)

Run this script to start both servers automatically:

```bash
./START_SERVERS.sh
```

This will open two new Terminal windows:
- One for the backend (port 5000)
- One for the frontend (port 3000)

## 🔧 Option 2: Manual Start

### Step 1: Start Backend Server

Open a new terminal and run:

```bash
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 3"
npm run dev
```

**Wait until you see:**
```
✓ Server running in development mode on port 5000
✓ MongoDB Connected: localhost
```

### Step 2: Start Frontend Server

In a **different** terminal (keep the backend running), run:

```bash
cd "/Users/youssef/Desktop/UNI/Semester 9/Web Based Systems/Project/Milestone 4"
npm start
```

The browser will open automatically to `http://localhost:3000`

## ✅ Testing the Application

Once BOTH servers are running:

1. **Sign Up:**
   - Go to `http://localhost:3000`
   - Click "Sign Up" tab
   - Fill in:
     - First Name: Youssef
     - Last Name: Elmahdy
     - Email: youssef2@aucegypt.edu (use a different email each time)
     - Password: Macthor21
     - Confirm Password: Macthor21
     - Major: Computer Science
     - Graduation Year: 2029
   - Click "Create Account"
   - You should see: **"Account created successfully! Redirecting..."**

2. **Sign In:**
   - Use the credentials you just created
   - Or use test account: `student@aucegypt.edu` / `password123`
   - You should see: **"Login successful! Redirecting..."**

## 🔍 Improved Error Messages

The error messages are now much more descriptive:

- **"Cannot connect to server. Please ensure the backend is running on port 5000."**
  → The backend is not running. Start it first!

- **"Invalid email or password."**
  → Wrong credentials

- **"This email is already registered. Please login instead."**
  → The email you're trying to sign up with already exists

- **"Backend API not found. Is the server running?"**
  → Backend server not reachable

## 🐛 Troubleshooting

### Problem: "Registration failed" or "Cannot connect to server"

**Solution:** The backend is not running. Follow Step 1 above to start it.

### Problem: Port 5000 already in use

**Solution:** Kill the process using port 5000:
```bash
lsof -ti:5000 | xargs kill -9
```

### Problem: Port 3000 already in use

**Solution:** Kill the process using port 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

### Problem: MongoDB connection error

**Solution:** Make sure MongoDB is running:
```bash
brew services start mongodb-community
```

## 📊 Verification Checklist

Before testing, verify:

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] MongoDB service running
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] Browser console shows no errors (F12)

## 🎯 Expected Behavior

**With Backend Running:**
- ✅ Sign up works → Success message → Redirects to home
- ✅ Sign in works → Success message → Redirects to home
- ✅ Browse professors and courses (real data from MongoDB)
- ✅ Search functionality works
- ✅ Can submit reviews (protected route)

**Without Backend Running:**
- ❌ "Cannot connect to server. Please ensure the backend is running on port 5000."
- ❌ Registration/login fails
- ❌ No data loads

## 📝 Test Accounts

After running `npm run seed` in Milestone 3:

- Student: `student@aucegypt.edu` / `password123`
- Admin: `admin@aucegypt.edu` / `admin123`

## 🚀 You're All Set!

Run the startup script or follow the manual steps, and your full-stack application will be running perfectly!
