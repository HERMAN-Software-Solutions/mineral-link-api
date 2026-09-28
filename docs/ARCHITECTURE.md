# Architecture — Mineral Link

## How the Pieces Talk to Each Other

Mineral Link is split into two separate repositories, plus a database:

- **mineral-link-web** — the Next.js frontend. This is what a miner, buyer, or admin actually sees and clicks on in their browser.
- **mineral-link-api** — the Node.js/Express backend. This holds all the business logic (e.g. "only a verified buyer can see a miner's contact info") and is the only thing that talks to the database directly.
- **Database (PostgreSQL, planned)** — stores users, listings, prices, and verification records, as described in `DATABASE_DESIGN.md`.

The flow is: the frontend never talks to the database directly. It sends requests (over HTTP, as JSON) to the API. The API checks the request, applies the rules, talks to the database if needed, and sends a response back. This separation matters because it means the rules (like "only show verified buyers a miner's phone number") live in one place — the API — instead of being duplicated or, worse, skippable from the frontend.

## Backend Folder Architecture (routes → controllers → services → models)

The API backend will follow a layered structure, where each layer has one job:

1. **routes/** — defines the URL paths (e.g. `GET /api/listings`) and which controller function handles each one. Routes do not contain logic — they just point requests to the right place.
2. **controllers/** — receives the request, pulls out the data it needs (e.g. query parameters, the logged-in user), does basic validation (e.g. "is a mineral type actually provided?"), calls the right service, and shapes the response that gets sent back.
3. **services/** — contains the actual business logic. For example, "a buyer can only see a listing's exact location if their verification status is approved" would live here, not in the controller.
4. **models/** — defines the shape of the data and how it's stored/retrieved from the database (matching the tables in `DATABASE_DESIGN.md`).

The reason for this separation is so that each layer can be tested and changed on its own. For example, the business rule for verification could change without needing to touch how routes are defined.

## Request Flow (text diagram)

Example: a buyer requests the list of active gold listings.

```
Browser (mineral-link-web)
   |
   | 1. User clicks "View Gold Listings"
   v
Next.js frontend
   |
   | 2. Sends HTTP GET request to
   |    https://api.mineral-link.../api/listings?mineral=gold&status=active
   v
mineral-link-api
   |
   | 3. routes/listings.ts matches the URL to a controller function
   v
   controllers/listingsController.ts
   |
   | 4. Validates the query parameters (e.g. is "gold" a real mineral?)
   v
   services/listingService.ts
   |
   | 5. Applies business logic (e.g. only return status = 'active' listings)
   |    and calls the model layer to fetch matching rows
   v
   models/Listing.ts
   |
   | 6. Runs the actual database query
   v
Database (PostgreSQL)
   |
   | 7. Returns matching rows
   v
   ... data flows back up through models -> services -> controller ...
   |
   | 8. Controller formats the response as JSON
   v
mineral-link-api sends JSON response
   |
   v
Next.js frontend receives it and renders the listings on the page
```

## Notes / Assumptions

- ASSUMPTION — needs review: whether authentication will use sessions or JWTs. JWTs are the current lean, since the frontend and backend are separate services (not a single combined app), which is a common reason to prefer token-based auth.
- ASSUMPTION — needs review: whether the API will be deployed separately from the frontend (e.g. API on one hosting service, frontend on another) or together — this affects CORS configuration but not the layered architecture itself.
