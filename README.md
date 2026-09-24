# Mon Dossier — document approval dashboard

Next.js App Router + MongoDB (Mongoose) + Cloudinary for multi-service document checklists.

## Flow

1. Client opens a service (Visa, University) and sees required document slots
2. Client uploads each document (Cloudinary, or `public/uploads` if Cloudinary env is empty)
3. Admin approves or rejects; reject requires a comment
4. When all required docs are approved, the application becomes `ready` and **Continuer la procédure** unlocks

## Setup

### A) Real MongoDB / Atlas

Set `MONGODB_URI` in `.env.local`, then:

```bash
npm install
npm run seed
npm run dev
```

### B) No Docker / no local Mongo (Windows-friendly)

```bash
npm install
npm run mongo:dev
```

In another terminal:

```bash
npm run seed
npm run dev
```

`mongo:dev` starts an in-memory MongoDB on port **27018** (persists under `.mongo-data` while the process is alive).

## Auth (real accounts)

- Public: `/login`, `/register` only
- Everything under `/mon-dossier`, the admin console, and APIs requires a signed httpOnly session cookie
- Register creates a **CLIENT** account, enrolls them in Visa + University, stores uploads in MongoDB + Cloudinary
- Each user only sees **their** applications and documents
- Admin reviews pending uploads at the obscure console path (see `ADMIN_APP_PATH` in code)
- There is **no** public “Admin” link — log in with an ADMIN account and you are redirected automatically

Admin login (seed default):
- Email: `admin@example.com`
- Password: `demo1234` (or `ADMIN_PASSWORD` from `.env.local`)
- Console URL: `/ops-revue-eef-k7m2` (old `/admin` returns 404)


```bash
npm run seed          # upsert services + ensure admin (does not wipe dossiers)
npm run seed:reset    # DANGER: wipe DB then recreate admin + demo client
```

Set optional `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env.local` before seeding.
## Routes

- `/login` — sign in
- `/mon-dossier` — client hub
- `/mon-dossier/services/visa` — visa document blocks
- `/mon-dossier/services/university` — university document blocks
- Admin console (obscure path) — pending review queue + approve / reject
