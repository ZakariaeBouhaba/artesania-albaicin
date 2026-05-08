# Artesanía Albaycín — E-commerce

Full-stack e-commerce for a handcraft boutique in Granada's Albaycín quarter. Museum-style design with a React/Vite frontend and an Express/PostgreSQL backend.

---

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
| Frontend | HTML, TypeScript, CSS, Javascript  |
| Backend  | Django, TypeScript, PostgreSQL, Python |

---

## Requisitos

- Node.js ≥ 18
- PostgreSQL ≥ 14 running locally
- npm ≥ 9

---

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd artisania-albaycin
```

### 2. Backend

```bash
cd backend
npm install
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
```bash
npm run dev
```

### 3. Frontend

```bash
cd ../frontend
npm install
cp .env.example .env       
npm run dev                # starts on http://localhost:5173
```

---

## Environment Variables

### `backend/.env`
| Variable | Description |
|----------|-------------|
| `PORT` | API server port (default `3001`) |
| `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` | PostgreSQL connection |
| `JWT_ACCESS_SECRET` | 64-char hex secret for access tokens |
| `JWT_REFRESH_SECRET` | 64-char hex secret for refresh tokens |
| `FRONTEND_URL` | Allowed CORS origin (default `http://localhost:5173`) |

### `frontend/.env`
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL (default `http://localhost:3001/api/v1`) |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for order button (e.g. `34600000000`) |

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
