# Mineral Link API

Backend service for Mineral Link — a platform that connects Uganda's small-scale and artisanal miners directly with verified buyers and exporters, and gives miners access to fair, transparent pricing for minerals like gold, tin, and tungsten.

## The Problem

Small-scale miners in Uganda usually have no direct way to reach buyers or exporters. They sell through middlemen who control what price information reaches the miner, which means miners are often paid far below the real market value of what they produce. Mineral Link exists to close that information gap by giving miners a direct channel to verified buyers and a transparent view of current prices.

## Who It Is For

- **Miners** — list what minerals they have available and see fair, up-to-date prices before they sell.
- **Buyers / Exporters** — find verified miners and sellers directly, without going through unverified middlemen.
- **Admins** — verify buyer accounts, moderate listings, and keep pricing data accurate and trustworthy.

## Tech Stack and Why

| Tool | Why it was chosen |
|---|---|
| **Node.js** | Runs JavaScript/TypeScript on the server, has a huge ecosystem of packages, and is fast to build and iterate with — good for a project that needs to move quickly during a 3-month internship. |
| **TypeScript** | Adds types on top of JavaScript. This catches mistakes (like sending the wrong data shape) before the code even runs, which matters for a project that will have multiple people/roles (miner, buyer, admin) and easy-to-mix-up data. |
| **Express** (planned) | A minimal, well-documented framework for building the REST API — routes, middleware, and request handling — without unnecessary complexity. |
| **PostgreSQL** (planned) | A relational database. Mineral Link's data is naturally relational (a user has many listings, a listing has one mineral type, a transaction links a buyer and a miner), so a relational database fits better than a document store. |

This is a documentation-only step, so no packages are installed yet. The stack above is the plan for when coding starts.

## How to Install and Run Locally

> Note: at this stage, this repository only contains documentation. These are the steps that will apply once the actual API code is added.

1. **Install Node.js** (LTS version) from [nodejs.org](https://nodejs.org).
2. **Clone this repository:**
   ```bash
   git clone <repository-url>
   cd mineral-link-api
   ```
3. **Install dependencies** (once `package.json` exists):
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in the values (database connection string, port, etc.)
5. **Run the development server:**
   ```bash
   npm run dev
   ```
6. The API will be available at `http://localhost:4000` (or whichever port is set in `.env`).

## Folder Structure (Planned)

```
mineral-link-api/
├── docs/                   # All project documentation (see below)
├── src/
│   ├── routes/             # Defines API endpoints (e.g. /api/listings) and connects them to controllers
│   ├── controllers/        # Receives requests, validates input, calls services, sends responses
│   ├── services/           # Business logic — the actual rules of how Mineral Link works
│   ├── models/             # Database table definitions and how data is shaped
│   ├── middleware/         # Code that runs between the request and the controller (auth checks, error handling)
│   └── index.ts            # Entry point — starts the server
├── .gitignore               # Files/folders Git should not track (node_modules, .env, dist, etc.)
├── LICENSE                  # MIT License
├── package.json              # Project dependencies and scripts (to be added when coding starts)
└── README.md                 # This file
```

## Documentation

Full project documentation lives in [`/docs`](./docs):
- [`PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md) — vision, roles, v1 feature scope
- [`DATABASE_DESIGN.md`](./docs/DATABASE_DESIGN.md) — tables, columns, relationships
- [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — how the system fits together
- [`ROADMAP.md`](./docs/ROADMAP.md) — the 3-month plan
- [`CONVENTIONS.md`](./docs/CONVENTIONS.md) — Git and code style rules

## Status

Documentation phase. No application code has been written yet — this is intentional, per the current task. Code will begin after mentor review.
