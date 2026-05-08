# Artesanía Albaycín — E-commerce

Full-stack e-commerce for a handcraft boutique in Granada's Albaycín quarter. Museum-style design with a React/Vite frontend and an Express/PostgreSQL backend.

---

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
<<<<<<< HEAD
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, React Router, Zustand, React Query |
| Backend  | Node.js, Express, TypeScript, PostgreSQL, JWT auth, Zod validation |
=======
| Frontend | HTML, CSS, JavaScript, React 18, TypeScript, TypeScript |
| Backend  | Node.js, Express, TypeScript, PostgreSQL |
>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf

---

## Prerequisites

<<<<<<< HEAD
- Node.js ≥ 18
- PostgreSQL ≥ 14 running locally
- npm ≥ 9
=======
| Tool | Version | Download |
|------|---------|----------|
| Node.js | ≥ 18 | https://nodejs.org (LTS) |
| PostgreSQL | ≥ 14 | https://www.postgresql.org/download |
| Git | latest | https://git-scm.com/downloads |
>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf

---

## Setup

### 1. Clone the repo

<<<<<<< HEAD
```bash
git clone <your-repo-url>
cd artisania-albaycin
```

=======
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

>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
### 2. Backend

```bash
cd backend
npm install
<<<<<<< HEAD
cp .env.example .env       
```

**Generate JWT secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Run it twice — once for `JWT_ACCESS_SECRET`, once for `JWT_REFRESH_SECRET`.

**Create the database and run migrations:**
```bash
createdb artisania_albaycin   
npm run migrate
npm run seed                  
```

**Start the backend (port 3001):**
=======
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

>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
```bash
npm run dev
```

<<<<<<< HEAD
### 3. Frontend

```bash
cd ../frontend
npm install
cp .env.example .env       
npm run dev                # starts on http://localhost:5173
```

=======
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

>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
---

## Environment Variables

### `backend/.env`
<<<<<<< HEAD
| Variable | Description |
|----------|-------------|
| `PORT` | API server port (default `3001`) |
| `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` | PostgreSQL connection |
=======

| Variable | Description |
|----------|-------------|
| `PORT` | API server port (default `3001`) |
| `DB_HOST` | PostgreSQL host (default `localhost`) |
| `DB_PORT` | PostgreSQL port (default `5432`) |
| `DB_NAME` | Database name (`artesania_albaicin`) |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
| `JWT_ACCESS_SECRET` | 64-char hex secret for access tokens |
| `JWT_REFRESH_SECRET` | 64-char hex secret for refresh tokens |
| `FRONTEND_URL` | Allowed CORS origin (default `http://localhost:5173`) |

### `frontend/.env`
<<<<<<< HEAD
=======

>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL (default `http://localhost:3001/api/v1`) |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for order button (e.g. `34600000000`) |

<<<<<<< HEAD
---

## Project Structure

```
artisania-albaycin/
├── backend/
│   ├── src/
│   │   ├── db/          # migrations, seed, pool
│   │   ├── middleware/  # auth, validation, rate-limit
│   │   ├── routes/      # products, auth, cart, orders
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── assets/      # logo.png
    │   ├── components/  # layout, home, product, cart, search, ui
    │   ├── contexts/    # I18nContext (ES/EN)
    │   ├── data/        # catalog.ts (static product data)
    │   ├── hooks/       # useLocalCart, useWishlist
    │   ├── pages/       # public, auth, client, admin
    │   ├── routes/      # AppRouter
    │   ├── services/    # API calls (auth, cart, orders)
    │   ├── store/       # Zustand auth + cart stores
    │   └── types/
    ├── .env.example
    └── package.json
```
=======
>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf

---

## Available Scripts

### Backend
<<<<<<< HEAD
=======

>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled build |
| `npm run migrate` | Run DB migrations |
| `npm run seed` | Seed sample data |
| `npm test` | Run Jest tests |

### Frontend
<<<<<<< HEAD
=======

>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
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
<<<<<<< HEAD
=======

>>>>>>> 17fd35d6fe5899abce367bcd439a2c73a8a2a4cf
