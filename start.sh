#!/bin/bash

# Simple starter script for MovieOverflow

# Detect OS and set PocketBase executable
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  POCKETBASE_EXE="./backend/pocketbase_linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  POCKETBASE_EXE="./backend/pocketbase"
elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* || "$OSTYPE" == "win32" ]]; then
  POCKETBASE_EXE="./backend/pocketbase.exe"
else
  echo "Unknown OS. Please start PocketBase manually."
  exit 1
fi

# Verify PocketBase executable exists
if [ ! -f "$POCKETBASE_EXE" ]; then
  echo "Error: PocketBase executable not found at $POCKETBASE_EXE"
  exit 1
fi

# Make sure PocketBase executable is executable
chmod +x "$POCKETBASE_EXE"

# Kill background processes on exit
cleanup() {
  echo "Shutting down services..."
  pkill -P $$
  echo "Done!"
}
trap cleanup EXIT

# Run npm install if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start PocketBase in background
echo "Starting PocketBase backend..."
cd backend
"$POCKETBASE_EXE" serve > pocketbase.log 2>&1 &
POCKETBASE_PID=$!
cd ..

# Wait for PocketBase to start (check the log file)
echo "Waiting for PocketBase to start..."
max_attempts=10
attempts=0
while [ $attempts -lt $max_attempts ]; do
  if grep -q "Server started at" ./backend/pocketbase.log; then
    echo "PocketBase server is running!"
    break
  fi
  attempts=$((attempts+1))
  sleep 1
done

if [ $attempts -eq $max_attempts ]; then
  echo "Warning: Could not confirm PocketBase started. Check backend/pocketbase.log for details."
fi

# Extract URLs from the log file
POCKETBASE_URL=$(grep "Server started at" ./backend/pocketbase.log | awk '{print $5}')
POCKETBASE_API=$(grep "REST API:" ./backend/pocketbase.log | awk '{print $3}')
POCKETBASE_DASHBOARD=$(grep "Dashboard:" ./backend/pocketbase.log | awk '{print $3}')

# Start frontend
echo "Starting frontend..."
npm run dev &

echo "MovieOverflow is running!"
echo "- PocketBase: ${POCKETBASE_URL:-http://127.0.0.1:8090}"
echo "- PocketBase API: ${POCKETBASE_API:-http://127.0.0.1:8090/api/}"
echo "- PocketBase Admin: ${POCKETBASE_DASHBOARD:-http://127.0.0.1:8090/_/}"
echo "- Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop all services"

# Wait for processes to finish
wait