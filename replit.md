# MessWise Workspace

## Overview

MessWise is a mobile-first, production-ready web application designed to reduce food wastage in a college mess (IIT Gandhinagar context). The system integrates behavioral tracking, analytics, and decision-making tools to actively reduce food wastage at both student and mess levels.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Frontend**: React + Vite (artifacts/messwise)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── messwise/           # MessWise React frontend
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## MessWise Features

### Authentication
- Login with Roll Number as both username and password
- Demo: student `22110001`, admin `admin001`
- JWT session tokens stored in localStorage
- Role-based routing (student / admin)

### Student Dashboard
- Daily/weekly/monthly wastage metrics
- Social impact: meals equivalent of wastage, people who could have been fed
- Economic impact: ₹ cost of wasted food (₹25/250g)
- CO2 and water savings metrics
- 7-day bar chart of wastage
- Leaderboard rank
- Today's upcoming meal cards
- Recent wastage logs
- Announcements

### Analytics Page
- Detailed charts (daily/weekly/monthly)
- Total and average per meal metrics

### Leaderboard
- Rankings by waste reduction
- Weekly/monthly/all-time filters
- Badge display

### Challenges & Badges
- Active challenges with progress bars
- Completed challenges
- Badge rarity system (common/rare/epic/legendary)

### Meal Preferences
- Pre-register meal attendance (full/half/skip)
- Helps mess plan quantities

### Admin Dashboard
- Overall wastage analytics
- Top wasters and top reducers
- Meal-wise pie chart breakdown
- Economic and CO2 impact totals
- Student management table
- Menu management (CRUD)
- Announcements management (CRUD)

## Database Tables

- `users` - Students and admins with wastage stats and streaks
- `wastage_logs` - Individual wastage events (linked to student)
- `menu_items` - Daily mess menu entries
- `announcements` - Mess announcements
- `meal_preferences` - Student meal opt-in/opt-out
- `badges` - Earned achievements
- `sessions` - Auth tokens

## API Routes

All routes at `/api/` prefix:
- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `GET /student/dashboard`, `GET /student/wastage`
- `POST /wastage/log` (IoT/face recognition endpoint)
- `GET /menu`, `POST /menu`
- `GET /leaderboard`
- `GET /announcements`, `POST /announcements`
- `GET /student/meal-preference`, `POST /student/meal-preference`
- `GET /student/challenges`, `GET /student/badges`
- `GET /admin/analytics`, `GET /admin/students`, `GET /admin/students/:id`

## Design

- Background: misty forest nature image (public/bg.jpg)
- Theme: deep forest greens, glassmorphism cards
- Fonts: Plus Jakarta Sans + Outfit
- Mobile-first responsive design
- Animated components via Framer Motion
- Charts via Recharts
