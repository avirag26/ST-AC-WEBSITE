# Getting started — Straight Line Academy

Follow this when you clone the project (especially if you started from `ST-AC-WEBSITE`).

## 1. Clone all repos

You need **six** repositories side by side (same parent folder):

```text
Straight line academy/
  ST-AC-BACKEND/
  ST-AC-WEBSITE/      ← you are here (docs hub)
  ST-AC-PARENT/
  ST-AC-CEO/
  ST-AC-HOME-TUTOR/
  ST-AC-OFFLINE-TUTOR/
```

Clone each remote your team uses into that layout.

## 2. Read the rules

1. [`RULES.md`](./RULES.md) — how we build  
2. [`TASKS.md`](./TASKS.md) — what is done and what is next  
3. Cursor: `.cursor/rules/straight-line-academy.mdc`

## 3. Start backend

```bash
cd ST-AC-BACKEND
cp .env.example .env          # then set DATABASE_URL / JWT secrets
docker compose up postgres redis -d   # optional if using local Docker DB
npm install
npx prisma migrate deploy
npm run prisma:seed
npm run start:dev
```

API: http://localhost:4000/api/health

## 4. Start apps you need

```bash
# CEO
cd ST-AC-CEO && npm install && npm run dev
# → http://localhost:3002

# Home Tutor
cd ST-AC-HOME-TUTOR && npm install && npm run dev
# → http://localhost:3003

# Website
cd ST-AC-WEBSITE && npm install && npm run dev
# → http://localhost:3000
```

Each app uses `NEXT_PUBLIC_API_URL=http://localhost:4000/api` (see `.env.example`).

## 5. Smoke test (auth loop)

1. CEO login → `9999999999` / `Ceo@12345`  
2. Catalog → confirm classes/subjects exist  
3. Home Tutor → register a new tutor **or** approve seed pending tutor `9888888888`  
4. CEO → Tutor approvals → Approve  
5. Home Tutor → login → dashboard  

## 6. How to contribute

- Take **one feature** from `TASKS.md`
- Build only that feature
- Update `docs/TASKS.md` checkboxes when done
- Stop for manual QA before the next feature

## Stack reminder

- Frontend: Next.js 15, TypeScript, Tailwind, Docker  
- Backend: NestJS, TypeScript, Prisma, PostgreSQL, Redis, S3  
- Auth: access JWT + refresh httpOnly cookie; axios on frontends  
