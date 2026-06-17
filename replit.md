# LearnOS — Student Learning Dashboard

A futuristic, dark-mode-only student dashboard with a Bento Grid layout, Framer Motion animations, and live data from a PostgreSQL database.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, serves at /api)
- `pnpm --filter @workspace/student-dashboard run dev` — run the frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned by Replit)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion + Lucide React
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/courses.ts` — courses table schema
- `artifacts/api-server/src/routes/courses.ts` — courses CRUD routes
- `artifacts/api-server/src/routes/dashboard.ts` — summary + activity routes
- `artifacts/student-dashboard/src/` — React frontend
  - `components/Sidebar.tsx` — collapsible nav with layoutId animation
  - `components/CourseCard.tsx` — course tile with animated progress bar
  - `components/HeroTile.tsx` — welcome tile + streak counter
  - `components/ActivityGraph.tsx` — contribution-style heatmap
  - `components/BentoGrid.tsx` — grid layout wrapper
  - `components/SkeletonTile.tsx` — loading skeleton

## Architecture decisions

- **Built-in Replit PostgreSQL** instead of Supabase — identical schema, zero external setup required
- **React Query** for async data fetching with loading states — equivalent to Next.js RSC + Suspense
- **Contract-first OpenAPI** — all types generated from `openapi.yaml`, no hand-written duplicates
- **Transform/opacity only** for all Framer Motion animations — zero layout shifts, GPU-accelerated
- **Dark-mode forced** via `class="dark"` on `<html>` — no light mode toggle

## Product

- Bento Grid dashboard with collapsible sidebar
- Hero tile: personalized greeting + streak counter
- Course tiles: live data with animated progress bars (0 → actual on mount)
- Activity graph: 52-week contribution heatmap
- Loading skeletons while data fetches
- Responsive: sidebar → icons (tablet), bottom nav (mobile)

## Courses Table Schema

```sql
courses (
  id         TEXT PRIMARY KEY (UUID),
  title      TEXT NOT NULL,
  progress   INTEGER DEFAULT 0,
  icon_name  TEXT DEFAULT 'book',
  created_at TIMESTAMP DEFAULT NOW()
)
```

## Seeded Data

4 courses pre-loaded: Advanced React Patterns (75%), TypeScript Deep Dive (42%), System Design Fundamentals (90%), Machine Learning Essentials (28%)

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec change before touching the frontend
- Restart the API server workflow after adding new routes (build step required)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
