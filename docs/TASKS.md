> **Documentation hub:** This copy lives in `ST-AC-WEBSITE/docs/`. Keep it updated when features ship so new clones stay accurate. Also see `GETTING_STARTED.md` and `RULES.md`.
# Straight Line Academy â€” Product Spec & Build Tasks

Use this file as the source of truth while building. Check off tasks as they land.

**Last updated:** 2026-10-13  
**Current focus:** Phase 2 â€” tutors see assigned sessions; attendance next

---

## 0. Progress snapshot (for new contributors)

### Done

| Area | Status |
|------|--------|
| 6 repos scaffolded (Next.js + NestJS + Docker files) | Done |
| Backend Prisma models (User, TutorProfile, Subject, ClassGrade, RefreshToken) | Done |
| JWT access + refresh (httpOnly cookie) + logout/me | Done |
| Tutor self-register API | Done |
| CEO login (axios + refresh) | Done |
| CEO app shell + dashboard | Done |
| CEO Classes & Subjects CRUD | Done |
| CEO Tutor approvals (approve/reject) | Done |
| Seed CEO + sample pending home tutor | Done |
| Home Tutor UI login/signup (tabs) | Done |
| Home Tutor wired to register/login + catalog API | Done |
| Home Tutor simple post-login dashboard | Done |
| Offline Tutor register/login + catalog API + dashboard | Done |
| CEO create student/parent + temp passwords (email stub) | Done |
| Parent email login + dashboard | Done |
| CEO offline batches (create, tutor, enroll) | Done |
| CEO schedule online/offline sessions + assign teacher | Done |
| Home / Offline tutor see assigned sessions (batches) | Done |
| Docs hub in `ST-AC-WEBSITE/docs` | Done |
| Cursor rules (`.cursor/rules/straight-line-academy.mdc`) | Done |

### In progress / next

| Priority | Feature |
|----------|---------|
| Next | Offline tutor mark attendance |
| Then | Parent classes / attendance view |
| Then | Wire real welcome email (SMTP) |

### Default local accounts (seed)

| Role | Phone | Password | Notes |
|------|-------|----------|-------|
| CEO | `9999999999` | `Ceo@12345` | Active |
| Pending home tutor | `9888888888` | `Tutor@12345` | Pending until CEO approves |

---

## 1. System overview

| Repo | Audience | Purpose | Dev port |
|------|----------|---------|----------|
| `ST-AC-BACKEND` | Shared | NestJS API, Postgres, Prisma, Redis, S3 | 4000 |
| `ST-AC-CEO` | CEO / admin | Approvals, scheduling, payments, salaries, live tracking | 3002 |
| `ST-AC-HOME-TUTOR` | Home tutors | Journey tracking, classes, reports, exams, quizzes | 3003 |
| `ST-AC-OFFLINE-TUTOR` | Center tutors | Batches, attendance, exams, quizzes | 3004 |
| `ST-AC-PARENT` | Parents | Classes, resources, exams, fees, attendance, quizzes | 3001 |
| `ST-AC-WEBSITE` | Public | Marketing / entry (later) | 3000 |

### Roles

- `CEO`
- `HOME_TUTOR`
- `OFFLINE_TUTOR`
- `PARENT`
- `STUDENT` (managed under parent; login for online students)

### Auth rules (global)

| Actor | Register | Login | Notes |
|-------|----------|-------|-------|
| Home / Offline tutor | Self-register | Phone + password | **Cannot login until CEO approves** |
| Parent (+ student) | CEO creates parent account | One family email + default password | Student is a profile under parent; no separate student login |
| CEO | Bootstrap / seed | Phone + password | Forgot password â†’ OTP via email |

- Subjects on tutor profile = **string array** (multiple subjects).
- Classes on tutor profile = **string array**.
- Docs on tutor register = **optional** (text note for now; S3 later).
- Forgot password: send OTP to registered email (not built yet).
- Tokens: **access** (Bearer) + **refresh** (httpOnly cookie). Frontends use **axios**.

---

## 2. Domain model (high level)

- [x] `User` â€” phone, email, passwordHash, role, status (`PENDING` \| `APPROVED` \| `REJECTED` \| `ACTIVE`), rejectionReason
- [x] `TutorProfile` â€” subjects[], classes[], documentsNote, salaryStatus
- [x] `Subject` / `ClassGrade` â€” CEO-managed catalogs
- [x] `RefreshToken` â€” hashed refresh tokens
- [x] `ParentProfile` / `Student`
- [x] `Batch` / `BatchStudent` (offline)
- [x] `Session` (online/offline schedule)
- [ ] `Journey` / `ClassReport` / `Attendance`
- [ ] `Exam` / `ExamMark` / `Quiz`
- [ ] `Fee` / `Payment` / `SalaryPayment` / `Resource` / `OtpToken`

---

## 3. CEO â€” features & tasks

### 3.1 Dashboard
- [x] Basic welcome dashboard + quick links
- [ ] KPI cards: tutors pending, active sessions, students online/offline, fees due, salaries pending
- [ ] Filters by date range

### 3.2 Teacher registration approval
- [x] List pending / approved / rejected tutors
- [x] View profile fields (name, DOB, email, phone, subjects, classes, docs note)
- [x] Approve â†’ status `APPROVED`
- [x] Reject with optional reason

### 3.3 Student & parent registration (CEO-driven)
- [x] Register student + parent (API + CEO UI)
- [x] Default temporary passwords returned to CEO (`mustChangePassword`)
- [ ] Real welcome email (SMTP) â€” stub logs only for now

### 3.4 Offline batches
- [x] Create / list / update batches under ClassGrade
- [x] Assign approved offline tutor
- [x] Enroll / remove students

### 3.5 Schedule sessions
- [x] Create online/offline sessions + assign teacher
- [x] List sessions + cancel

### 3.6â€“3.9 Exams, fees, salaries, live tracking
- [ ] Not started

### 3.10 Auth (CEO)
- [x] Login with phone + password
- [x] Access + refresh tokens
- [ ] Forgot password â†’ OTP email

### Catalog (classes & subjects)
- [x] List / create / edit / soft-delete classes
- [x] List / create / edit / soft-delete subjects

---

## 4. Home Tutor â€” features & tasks

### 4.1 Auth & profile
- [x] Register UI + API (`HOME_TUTOR`, pending)
- [x] Classes/subjects dropdowns load from CEO catalog API
- [x] Login phone + password (blocked until approved)
- [x] Access + refresh via axios
- [x] Simple dashboard after login
- [ ] Forgot password OTP
- [ ] Profile shows salary / payment status

### 4.2 Assigned classes
- [x] See CEO-assigned online sessions on dashboard

### 4.3â€“4.6 Journey, exams, hours
- [ ] Not started

---

## 5. Offline Tutor â€” features & tasks

- [x] Register / login / approval gate (API wired)
- [x] Simple dashboard after login
- [x] See assigned batches + students + sessions
- [ ] Attendance marking
- [ ] Exams / quizzes / richer dashboard

---

## 6. Parent â€” features & tasks

- [x] Auth (email login; CEO-created account)
- [x] Simple dashboard (linked students)
- [ ] Classes / attendance / resources / exams / fees / quizzes

---

## 7. Shared backend tasks

### 7.1 Foundation
- [x] Auth module (JWT access + refresh cookie)
- [x] Role guards + approval gate for tutors
- [x] Prisma schema (auth + catalog + tutor profile)
- [ ] Redis used for live location / cache beyond scaffolding
- [ ] S3 uploads beyond scaffolding
- [ ] OTP module (email)

### 7.2 Modules (API)
- [x] Users / Auth
- [x] Tutors (register + CEO approve/reject list)
- [x] Catalog (subjects/classes CRUD)
- [x] Students / Parents (CEO create + list; one family email)
- [x] Parent email login (`POST /auth/login/email`)
- [x] Batches (CEO offline batches CRUD + enroll)
- [x] Sessions (CEO schedule online/offline + assign tutor)
- [ ] Journey / Reports / Attendance / Exams / Quizzes / Fees / Salaries / Email

---

## 8. Suggested build order (phases)

### Phase 0 â€” Repo hygiene
- [x] Docker compose files per repo
- [x] Seed CEO user (+ sample pending tutor)
- [ ] Git remotes per repo (optional)

### Phase 1 â€” Auth & approvals
- [x] Prisma User + TutorProfile + catalogs + refresh tokens
- [x] Tutor self-register (home tutor wired)
- [x] CEO approve/reject tutors
- [x] Phone+password login (CEO + home tutor) with approval check
- [x] Offline tutor register/login UI wired
- [x] CEO create student/parent + default password (email stub; one family email)
- [x] Parent email login
- [ ] Forgot password OTP
- [ ] Real welcome email SMTP

### Phase 2 â€” Scheduling core
- [x] CEO: offline batches (under ClassGrade + tutor + enroll)
- [x] CEO: schedule online/offline sessions + assign teacher
- [x] Home tutor: see assigned classes
- [x] Offline tutor: see classes â†’ batches â†’ students â†’ sessions

### Phase 3 â€” Attendance & parent classes view
- [ ] Offline tutor mark attendance
- [ ] Parent: upcoming/completed classes + notes/time
- [ ] Parent: attendance calendar green/red

### Phase 4 â€” Home tutor journey
- [ ] Leave / reach / start / stop + live location
- [ ] CEO live tracking dashboard
- [ ] Report + PDF on stop (or write later)
- [ ] Hours calculation + home tutor dashboard filters

### Phase 5 â€” Exams & quizzes
- [ ] CEO create exam + subjects + assign teacher + history/timetable
- [ ] Tutors enter marks (+ exam attendance)
- [ ] Quiz create for student/class/batch
- [ ] Parent exam marks + weak subject/points
- [ ] Parent quiz section

### Phase 6 â€” Fees, salaries, resources
- [ ] CEO collect fees + history
- [ ] Parent fees upcoming/paid
- [ ] CEO mark salary credited â†’ tutor payment status
- [ ] Resources PDFs by subject â†’ parent resources

### Phase 7 â€” Polish
- [ ] CEO full dashboard KPIs
- [ ] Offline tutor dashboard
- [ ] Home tutor dashboard
- [ ] Notifications, validation, audit logs
- [ ] Website marketing pages (if needed)

---

## 9. UI screens checklist (by app)

### CEO
1. [x] Login  
2. [x] Dashboard (basic)  
3. [x] Tutor approvals  
4. [x] Register student/parent  
5. [x] Classes & subjects catalog (full CRUD)  
6. [x] Offline batches  
7. [x] Schedule session  
8. [ ] Exams  
9. [ ] Fees  
10. [ ] Salaries  
11. [ ] Live tracking  
12. [ ] Forgot password  

### Home Tutor
1. [x] Register / Login  
2. [x] Basic dashboard  
3. [x] My assigned sessions  
4. [ ] Journey / reports / exams / quizzes / profile  

### Offline Tutor
1. [x] Register / Login  
2. [x] Basic dashboard  
3. [x] My batches + sessions  
4. [ ] Attendance / exams / quizzes  

### Parent
1. [x] Login (email)  
2. [x] Basic dashboard (students list)  
3. [ ] Classes / attendance / exams / fees / quizzes  

### Website
- Mostly not started (docs hub + scaffold)

---

## 10. Acceptance notes (product rules)

1. **Only CEO assigns classes** to home and offline tutors.  
2. **Tutors cannot login** until CEO accepts registration.  
3. **Subjects and classes are multi-value** on tutor profiles; catalogs are CEO-managed.  
4. **Home tutor journey** is required for online home sessions (leave â†’ reach â†’ start â†’ stop).  
5. **Class report** can be filled at stop **or later**.  
6. **Offline attendance**: unmarked = **Absent** for parent view of that class.  
7. **Salary status** updates only when CEO marks salary sent/credited.  
8. **Welcome email** with default password when CEO registers a student/parent.  
9. **Forgot password** always uses **email OTP**.  
10. **Login identifiers**: tutors & CEO â†’ **phone**; parent â†’ **email** (covers the student; no separate student email login).

---

## 11. Development rules (follow these)

> Also enforced for Cursor via `.cursor/rules/straight-line-academy.mdc` and `RULES.md`.

1. **One feature at a time** â€” implement, verify, wait for human test approval.  
2. **Do not invent APIs** or claim backend works if it is not implemented.  
3. **Reuse UI components** (Card, PageHeader, Tabs, Alert, Button, TextField).  
4. **Mobile-first**, blue/white theme (`#2563EB`), simple language for parents/teachers.  
5. **Auth**: axios + access Bearer + refresh httpOnly cookie; never store refresh in localStorage.  
6. **Update this TASKS.md** when a feature ships (checkboxes + progress snapshot).  
7. **No secrets in git/chat** â€” never paste `.env` passwords into commits or messages.  
8. **Small diffs** â€” do not refactor unrelated repos â€œwhile youâ€™re thereâ€.  
9. **CEO-first** for shared data (subjects, classes, approvals) before deep tutor/parent flows.  
10. After bugs are reported, **fix before** starting the next feature.

---

## 12. How to run (local)

```bash
# Backend
cd ST-AC-BACKEND
docker compose up postgres redis -d   # or use your DATABASE_URL
npx prisma migrate deploy
npm run prisma:seed
npm run start:dev

# CEO
cd ST-AC-CEO
npm run dev    # http://localhost:3002

# Home Tutor
cd ST-AC-HOME-TUTOR
npm run dev    # http://localhost:3003

# Offline Tutor
cd ST-AC-OFFLINE-TUTOR
npm run dev    # http://localhost:3004

# Parent
cd ST-AC-PARENT
npm run dev    # http://localhost:3001
```

### Suggested smoke test (auth loop)

1. CEO login â†’ Catalog: add a subject/class if needed.  
2. Offline Tutor signup (`http://localhost:3004`) â†’ CEO approve â†’ Offline Tutor login.  
3. CEO â†’ Students & parents â†’ create parent + student (one family email).  
4. Parent login (`http://localhost:3001`) with that email + temp password â†’ dashboard shows student.

---

## 13. Immediate next step

**Offline tutor mark attendance** (unmarked = Absent for parent view).

When coding, say what feature you are taking, update checkboxes here when done, and stop for manual QA.

