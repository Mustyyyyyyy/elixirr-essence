#!/usr/bin/env bash
# Start script for Elixirr Essence

echo "Starting Elixirr Essence..."

# Start Backend
cd backend
echo "Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start Admin
cd ../client/admin
echo "Starting admin panel..."
npm run dev &
ADMIN_PID=$!

# Wait for admin to start
sleep 3

# Start Frontend
cd ../client
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "All services started!"
echo "Frontend: http://localhost:5173"
echo "Admin Login: http://localhost:3001/admin/login"
echo "Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for any process to exit
wait

# Cleanup on exit
kill $BACKEND_PID $ADMIN_PID $FRONTEND_PID 2>/dev/null
echo "All services stopped"