LearnOS — Student Learning Dashboard
A futuristic, dark-mode student dashboard built with React, Framer Motion, and PostgreSQL.

LearnOS Dashboard

Features
Bento Grid Layout — modern card-based dashboard
Live Course Data — real PostgreSQL database with Drizzle ORM
Animated Progress Bars — Framer Motion spring animations
Course Detail Pages — lesson checklists that save progress to the DB
Search & Filter — real-time course search with animated filter tabs
Activity Heatmap — 52-week contribution-style graph
Responsive — sidebar on desktop, bottom nav on mobile
Dark Mode Only — forced dark theme throughout
Tech Stack
Layer	Technology
Frontend	React + Vite + TypeScript
Styling	Tailwind CSS
Animations	Framer Motion
Icons	Lucide React
Router	Wouter
API Client	React Query (Orval codegen)
Backend	Express 5 + Node.js
Database	PostgreSQL + Drizzle ORM
Validation	Zod
Package Manager	pnpm workspaces
Project Structure
learnos-dashboard/
├── artifacts/
│   ├── student-dashboard/     # React frontend
│   │   └── src/
│   │       ├── components/    # Sidebar, CourseCard, HeroTile, etc.
│   │       ├── pages/         # Dashboard, Courses, Activity, Settings, CourseDetail
│   │       └── assets/        # AI-generated course images + avatar
│   └── api-server/            # Express API server
│       └── src/routes/        # courses.ts, dashboard.ts
├── lib/
│   ├── api-spec/              # OpenAPI contract (source of truth)
│   └── db/                    # Drizzle ORM schema + migrations
└── package.json

Getting Started
Prerequisites
Node.js 18+
pnpm (npm install -g pnpm)
PostgreSQL database
Installation
# Install dependencies
pnpm install
# Set environment variable
DATABASE_URL=postgresql://user:password@localhost:5432/learnos
# Push database schema
pnpm --filter @workspace/db run push
# Start the API server
pnpm --filter @workspace/api-server run dev
# Start the frontend
pnpm --filter @workspace/student-dashboard run dev

Available Scripts
pnpm run typecheck          # Full typecheck across all packages
pnpm run build              # Typecheck + build all packages
pnpm --filter @workspace/api-spec run codegen  # Regenerate API hooks from OpenAPI spec

API Endpoints
Method	Endpoint	Description
GET	/api/courses	List all courses
GET	/api/courses/:id	Get a single course
PATCH	/api/courses/:id	Update course progress
GET	/api/dashboard/summary	Stats summary
GET	/api/dashboard/activity	52-week activity data
Database Schema
courses (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  progress    INTEGER DEFAULT 0,
  icon_name   TEXT DEFAULT 'book',
  created_at  TIMESTAMP DEFAULT NOW()
)

Seeded Courses
Course	Progress
Advanced React Patterns	75%
TypeScript Deep Dive	42%
System Design Fundamentals	90%
Machine Learning Essentials	28%
License
MIT
