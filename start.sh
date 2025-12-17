#!/bin/bash

# Vibe Coding Monorepo Startup Script

set -e # Exit on error

# Function to keep window open
hold_window() {
  # Only wait if running in an interactive terminal
  if [ -t 0 ]; then
    echo ""
    echo "Script finished/exited. Spawning a new shell to keep window open..."
    exec "${SHELL:-/bin/bash}"
  fi
}

# Trap EXIT signal (handles both success and error)
trap hold_window EXIT

echo "🚀 Starting Vibe Coding Monorepo..."

# 1. Install Dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Start Infrastructure
echo "🐳 Starting Docker services..."
docker-compose up -d

# 3. Wait for Postgres
echo "⏳ Waiting for Database..."
sleep 5 # Giving Postgres a moment to wake up

# 4. Database Setup
echo "🛠️  Setting up Database..."
# Run Prisma commands in the API context
(
  cd apps/api
  # Ensure the db is in sync with schema
  npx prisma migrate dev --name init
  # Seed data
  npx prisma db seed
)

# 5. Run Applications
echo "✨ Starting Applications..."
echo "   - Web: http://localhost:3000"
echo "   - API: http://localhost:3001"

npx concurrently \
  -n "WEB,API" \
  -c "cyan,magenta" \
  "npm run dev -w apps/web" \
  "npm run start:dev -w apps/api"
