# Artesanía Albaycín — E-commerce

Full-stack e-commerce for a handcraft boutique in Granada's Albaycín quarter. Museum-style design with a React/Vite frontend and an Express/PostgreSQL backend.

---

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
| Frontend | HTML, CSS, JavaScript, React 18, TypeScript, TypeScript |
| Backend  | Node.js, Express, TypeScript, PostgreSQL |

---

## Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | ≥ 18 | https://nodejs.org (LTS) |
| PostgreSQL | ≥ 14 | https://www.postgresql.org/download |
| Git | latest | https://git-scm.com/downloads |

---

## Setup

### 1. Clone the repo

**Mac / Linux:**
```bash
git clone https://github.com/ZakariaeBouhaba/artesania-albaicin.git
cd artesania-albaicin
```

**Windows (CMD / PowerShell / Git Bash):**
```bash
git clone https://github.com/ZakariaeBouhaba/artesania-albaicin.git
cd artesania-albaicin
```

---

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

> **Windows:** si `cp` ne fonctionne pas, utilise:
> ```bash
> copy .env.example .env
> ```

**Generate JWT secrets (run twice):**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Paste the first output into `JWT_ACCESS_SECRET` and the second into `JWT_REFRESH_SECRET` inside `.env`.

**Create the database and run migrations:**

```bash
createdb artesania_albaicin
npm run migrate
npm run seed
```

> **Windows:** si `createdb` ne marche pas, ouvre **pgAdmin** et crée la base manuellement avec le nom `artesania_albaicin`.

**Start the backend (port 3001):**

```bash
npm run dev
```

---

### 3. Frontend

Ouvre un **nouveau terminal** :

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

> **Windows:**
> ```bash
> copy .env.example .env
> ```

Site disponible sur → **http://localhost:5173** 🚀

---

## Environment Variables

### `backend/.env`

| Variable | Description |
|----------|-------------|
| `PORT` | API server port (default `3001`) |
| `DB_HOST` | PostgreSQL host (default `localhost`) |
| `DB_PORT` | PostgreSQL port (default `5432`) |
| `DB_NAME` | Database name (`artesania_albaicin`) |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `JWT_ACCESS_SECRET` | 64-char hex secret for access tokens |
| `JWT_REFRESH_SECRET` | 64-char hex secret for refresh tokens |
| `FRONTEND_URL` | Allowed CORS origin (default `http://localhost:5173`) |

### `frontend/.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL (default `http://localhost:3001/api/v1`) |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for order button (e.g. `34600000000`) |


---

## Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled build |
| `npm run migrate` | Run DB migrations |
| `npm run seed` | Seed sample data |
| `npm test` | Run Jest tests |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

---

## Notes

- The frontend uses **static catalog data** (`src/data/catalog.ts`) for product display, while the backend handles auth, cart sync, and orders.
- Cart and wishlist are persisted in **localStorage** (`aa_cart`, `aa_wish`).
- Language preference (ES/EN) is stored in localStorage as `aa_lang`.
- Admin panel is at `/admin` — requires a user with `role: admin` or `role: employee`.

