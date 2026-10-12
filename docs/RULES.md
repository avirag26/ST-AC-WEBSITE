# Straight Line Academy — Rules for contributors

Read this before coding. Product checklist lives in [`TASKS.md`](./TASKS.md). Cursor also loads `../.cursor/rules/straight-line-academy.mdc`.

## How we build

1. **One feature at a time.** Finish → test → get approval → next.
2. Prefer **CEO foundations** (catalog, approvals) before deep tutor/parent features.
3. After each feature, update **`TASKS.md`** (progress table + checkboxes).
4. Do not start large unrelated refactors.

## Apps & ports

| App | Folder | Port |
|-----|--------|------|
| API | `ST-AC-BACKEND` | 4000 |
| Website | `ST-AC-WEBSITE` | 3000 |
| Parent | `ST-AC-PARENT` | 3001 |
| CEO | `ST-AC-CEO` | 3002 |
| Home Tutor | `ST-AC-HOME-TUTOR` | 3003 |
| Offline Tutor | `ST-AC-OFFLINE-TUTOR` | 3004 |

## Auth

- CEO / tutors: **phone + password**
- Tutors need **CEO approval** before login
- Parent: **email** (CEO creates parent + student; one family email, no separate student login)
- **Access token** in memory/localStorage + **refresh token** in **httpOnly cookie**
- Use **axios** with `withCredentials: true` and refresh-on-401

## UI

- Mobile-first, simple language
- Blue/white theme primary `#2563EB`
- Reuse shared patterns already in each app (`Button`, `TextField`, `Card`, etc.)
- Always handle loading, empty, validation, and error states

## Backend

- NestJS modules + Prisma
- Validate DTOs with `class-validator`
- Soft-delete catalogs via `isActive` when removing subjects/classes
- Never commit real secrets; use `.env.example` as the template

## Do not

- Fake successful API responses
- Store refresh tokens in localStorage
- Skip mobile layout
- Paste database passwords into chat, PRs, or docs
- Build multiple phases in one PR/session without approval
