#!/bin/bash

echo "🚀 ProfLens AUC - Starting Servers"
echo "=================================="
echo ""

# Check if backend dependencies are installed
if [ ! -d "Milestone 3/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd "Milestone 3"
  npm install
  cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "Milestone 4/node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  cd "Milestone 4"
  npm install
  cd ..
fi

echo ""
echo "✅ Dependencies ready"
echo ""
echo "Starting servers in separate terminal windows..."
echo ""

# macOS specific - open in separate Terminal tabs
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd '$(pwd)/Milestone 3' && echo '🔧 Backend Server' && echo '=================' && npm run dev"
    delay 2
    do script "cd '$(pwd)/Milestone 4' && echo '🎨 Frontend Server' && echo '==================' && npm start"
end tell
EOF

echo ""
echo "✅ Servers starting in separate Terminal windows!"
echo ""
echo "Backend will be at: http://localhost:5000"
echo "Frontend will be at: http://localhost:3000"
echo ""
echo "Wait for both servers to fully start before testing."
