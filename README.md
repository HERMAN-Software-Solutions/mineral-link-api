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
| **Express**| A minimal, well-documented framework for building the REST API — routes, middleware, and request handling — without unnecessary complexity. |
| **PostgreSQL** | A relational database. Mineral Link's data is naturally relational (a user has many listings, a listing has one mineral type, a transaction links a buyer and a miner), so a relational database fits better than a document store. |

## How to Install and Run Locally

1. **Install Node.js** (LTS version) from [nodejs.org](https://nodejs.org).
2. **Clone this repository:**
   ```bash
   git clone <repository-url>
   cd mineral-link-api
   ```
3. 3. **Install dependencies:**
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
├── docs/                   # Project documentation
├── prisma/
│   ├── schema.prisma       # Database models, enums and relations
│   └── migrations/         # History of database changes
├── src/
│   ├── config/             # Reads and checks the .env settings (env.ts)
│   ├── controllers/        # Handles the HTTP request and response
│   ├── middleware/         # authenticate, authorize, error handling
│   ├── routes/             # URL definitions that point to controllers
│   ├── services/           # Business logic and database calls (db.ts, auth.service.ts)
│   ├── types/              # TypeScript types (AuthUser, req.user)
│   ├── utils/              # Helpers: JWT, AppError, Zod schemas
│   ├── app.ts              # Express app setup
│   └── server.ts           # Entry point, starts the server
├── .env.example            # Placeholder settings (the real .env is never committed)
├── prisma.config.ts        # Prisma connection settings
├── tsconfig.json           # TypeScript settings (strict mode on)
└── package.json            # Dependencies and scripts
```

## Documentation

Full project documentation lives in [`/docs`](./docs):
- [`PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md) — vision, roles, v1 feature scope
- [`DATABASE_DESIGN.md`](./docs/DATABASE_DESIGN.md) — tables, columns, relationships
- [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — how the system fits together
- [`ROADMAP.md`](./docs/ROADMAP.md) — the 3-month plan
- [`CONVENTIONS.md`](./docs/CONVENTIONS.md) — Git and code style rules

## Database

Mineral Link uses PostgreSQL, accessed through Prisma 7. The tables are described in `prisma/schema.prisma`, and the design behind them is in `docs/DATABASE_DESIGN.md`.

### Set up PostgreSQL locally

1. Install PostgreSQL (version 16 or newer) from postgresql.org. During setup, choose a password for the `postgres` user and remember it.
2. Create an empty database named `mineral_link_dev` (pgAdmin works: right-click Databases, then Create, then Database).
3. Copy `.env.example` to `.env` and replace `USER` and `PASSWORD` with your own PostgreSQL username and password. The `.env` file is ignored by Git and must never be committed.

### Run migrations

1. Install the project's packages: `npm install`
2. Create the tables: `npm run db:migrate`
3. To look at the tables in a browser: `npm run db:studio`

More detail is in `prisma/README.md`.

### Seeding

Run `npm run db:seed` to add Gold, Tin and Tungsten and an admin account. Set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` in your `.env` first. It is safe to run more than once.

## Authentication

The API uses JWT (JSON Web Tokens). A user registers or logs in and receives a token. For protected routes, the token is sent in the `Authorization` header as `Bearer <token>`. Passwords are hashed with bcrypt (10 rounds), and `passwordHash` is never included in any response.

### Setup

Add these to your `.env` (the placeholders are in `.env.example`):

- `PORT` — port the API listens on (default 4000)
- `JWT_SECRET` — long random secret used to sign tokens (at least 16 characters)
- `JWT_EXPIRES_IN` — how long a token stays valid, for example `1d`

Start the API with `npm run dev`. It runs at `http://localhost:4000`.

### Endpoints

#### POST /api/auth/register

Creates an account and returns the user and a token. Only the roles `miner` and `buyer` can register here. Admins will be seeded later.

Body:

```json
{
  "name": "Adeline Test",
  "email": "adeline.test@example.com",
  "password": "Password123",
  "role": "miner"
}
```

Rules: `name` at least 2 characters, a valid `email`, `password` between 8 and 72 characters, `role` is `miner` or `buyer`.

Response `201`: `{ "user": { ... }, "token": "<jwt>" }`

Errors: `400` validation failed, `409` an account with this email already exists.

#### POST /api/auth/login

Checks the email and password and returns the user and a token.

Body:

```json
{
  "email": "adeline.test@example.com",
  "password": "Password123"
}
```

Response `200`: `{ "user": { ... }, "token": "<jwt>" }`

Errors: `400` validation failed, `401` invalid email or password.

#### GET /api/auth/me

Protected. Returns the profile of the logged-in user. Send the header `Authorization: Bearer <token>`.

Response `200`: `{ "user": { ... } }`

Errors: `401` token missing, invalid or expired.

### Errors

Every error is JSON with an `error` message. Validation errors (`400`) also include a `details` list with the field and message for each problem.

## Minerals and Listings

Protected routes need the header `Authorization: Bearer <token>` (see Authentication above). Every error is JSON with an `error` message.

### Minerals

#### GET /api/minerals

Public. Returns all minerals, sorted by name.

Response `200`: `{ "minerals": [ { "id": "...", "name": "Gold", "unit": "gram" } ] }`

#### POST /api/minerals

Admin only. Creates a mineral. The name is cleaned up to one consistent form, so `gold` and ` GOLD ` both become `Gold`.

Body:

```json
{
  "name": "Copper",
  "unit": "kg"
}
```

Response `201`: `{ "mineral": { ... } }`

Errors: `400` validation failed, `401` no token, `403` not an admin, `409` a mineral with this name already exists.

### Listings

Listings return the related mineral (`id`, `name`, `unit`) and the miner (`id`, `name`, `region`). The miner's email and password hash are never included. `quantity` is returned as text, so no precision is lost.

#### GET /api/listings

Public. Returns active listings, newest first.

Query parameters (both optional):

- `mineralId` — a mineral's UUID
- `region` — the miner's region, not case sensitive (for example `?region=kampala`)

Response `200`: `{ "listings": [ { ... } ] }`

Errors: `400` invalid query.

#### GET /api/listings/:id

Public. Returns one listing.

Response `200`: `{ "listing": { ... } }`

Errors: `400` invalid id, `404` listing not found or removed.

#### POST /api/listings

Miner only. Creates a listing. The miner is always the logged-in user, taken from the token. Any `minerId` in the body is ignored.

Body:

```json
{
  "mineralId": "159caee9-87d0-4a44-b42f-0854b030dd06",
  "quantity": 2.5,
  "location": "Kampala",
  "notes": "Alluvial gold, ready for collection"
}
```

Rules: `mineralId` is a valid UUID, `quantity` is a number greater than 0, `location` is 2 to 120 characters, `notes` is optional.

Response `201`: `{ "listing": { ... } }`

Errors: `400` validation failed, `401` no token, `403` not a miner, `404` mineral not found.

#### PATCH /api/listings/:id

Miner only, and only the owner of the listing. Send at least one of `quantity`, `location`, `notes` or `status` (`active` or `sold`).

Response `200`: `{ "listing": { ... } }`

Errors: `400` validation failed, `401` no token, `403` not a miner or not the owner, `404` listing not found.

#### DELETE /api/listings/:id

Miner only, and only the owner. The listing is marked `removed`. It stays in the database but no longer appears in the API.

Response `204`: no body.

Errors: `401` no token, `403` not a miner or not the owner, `404` listing not found.

### Assumptions (need review)

- ASSUMPTION — needs review: DELETE marks a listing as `removed` instead of erasing the row, because buyers' interest records point at listings.
- ASSUMPTION — needs review: the public list shows only `active` listings.
- ASSUMPTION — needs review: the `region` filter uses the miner's region. Registration does not collect a region yet, so miners have none until a way to set it is added.## Status
Database, authentication, minerals and listings APIs are in place.


