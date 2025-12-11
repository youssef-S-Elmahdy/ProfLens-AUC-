#!/bin/bash

echo "🔍 ProfLens AUC - System Check"
echo "==============================="
echo ""

# Check backend
echo "1. Checking backend server..."
if lsof -ti:5000 > /dev/null 2>&1; then
  echo "   ✅ Backend is running on port 5000"
  if curl -s http://localhost:5000/ > /dev/null 2>&1; then
    echo "   ✅ Backend is responding"
  else
    echo "   ⚠️  Backend not responding properly"
  fi
else
  echo "   ❌ Backend is NOT running"
  echo "   → Start it with: cd 'Milestone 3' && npm run dev"
fi

echo ""

# Check frontend
echo "2. Checking frontend server..."
if lsof -ti:3000 > /dev/null 2>&1; then
  echo "   ✅ Frontend is running on port 3000"
else
  echo "   ❌ Frontend is NOT running"
  echo "   → Start it with: cd 'Milestone 4' && npm start"
fi

echo ""

# Check MongoDB
echo "3. Checking MongoDB..."
if pgrep -x mongod > /dev/null 2>&1; then
  echo "   ✅ MongoDB is running"
else
  echo "   ⚠️  MongoDB might not be running"
  echo "   → Start it with: brew services start mongodb-community"
fi

echo ""

# Check dependencies
echo "4. Checking dependencies..."
if [ -d "Milestone 3/node_modules" ]; then
  echo "   ✅ Backend dependencies installed"
else
  echo "   ❌ Backend dependencies missing"
  echo "   → Install with: cd 'Milestone 3' && npm install"
fi

if [ -d "Milestone 4/node_modules" ]; then
  echo "   ✅ Frontend dependencies installed"
else
  echo "   ❌ Frontend dependencies missing"
  echo "   → Install with: cd 'Milestone 4' && npm install"
fi

echo ""
echo "==============================="
echo ""

# Summary
if lsof -ti:5000 > /dev/null 2>&1 && lsof -ti:3000 > /dev/null 2>&1; then
  echo "✅ All systems operational!"
  echo "   Frontend: http://localhost:3000"
  echo "   Backend:  http://localhost:5000"
else
  echo "⚠️  Some services are not running."
  echo "   Use ./START_SERVERS.sh to start everything."
fi

echo ""
