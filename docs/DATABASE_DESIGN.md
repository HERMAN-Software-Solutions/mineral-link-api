# Database Design — Mineral Link (v1)

This document lists the tables believed to be necessary for the v1 scope described in `PROJECT_OVERVIEW.md`. Types are written in a general SQL-style format (to be adapted to whichever database is finalized — PostgreSQL is the current plan).

## Tables

### 1. `users`
Stores every account, regardless of role. Role determines what they can do.

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | Primary key |
| name | VARCHAR | Full name |
| email | VARCHAR, unique | Used for login |
| password_hash | VARCHAR | Never store plain text passwords |
| role | ENUM('miner', 'buyer', 'admin') | Determines permissions |
| phone_number | VARCHAR, nullable | Many miners may prefer phone contact over email |
| region | VARCHAR, nullable | Miner's or buyer's operating region |
| is_verified | BOOLEAN, default false | Relevant mainly for buyers (see `verifications`) |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### 2. `minerals`
A small reference table of the minerals the platform supports. Kept separate from `listings` so pricing and mineral metadata isn't repeated everywhere.

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | |
| name | VARCHAR | e.g. "Gold", "Tin", "Tungsten" |
| unit | VARCHAR | e.g. "gram", "kg" — ASSUMPTION — needs review: gold priced per gram, tin/tungsten per kg is a guess based on how they're commonly traded |

### 3. `mineral_prices`
Stores the reference price for each mineral. Kept as its own table (rather than a column on `minerals`) so price history can be tracked over time.

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | |
| mineral_id | UUID (FK → minerals.id) | |
| price_ugx | DECIMAL | Price in Ugandan Shillings |
| set_by_admin_id | UUID (FK → users.id) | Which admin last updated this price |
| effective_date | TIMESTAMP | When this price became current |

### 4. `listings`
A miner's offer of a quantity of a mineral for sale.

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | |
| miner_id | UUID (FK → users.id) | |
| mineral_id | UUID (FK → minerals.id) | |
| quantity | DECIMAL | In the mineral's unit |
| location | VARCHAR | Where the mineral is / can be collected |
| status | ENUM('active', 'sold', 'removed') | default 'active' |
| notes | TEXT, nullable | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### 5. `verifications`
Tracks a buyer's verification request and its outcome, separately from the `users` table, so there's a record of what was submitted and reviewed.

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | |
| buyer_id | UUID (FK → users.id) | |
| business_name | VARCHAR | ASSUMPTION — needs review: exact required fields |
| document_reference | VARCHAR, nullable | e.g. a reference to an uploaded registration document |
| status | ENUM('pending', 'approved', 'rejected') | default 'pending' |
| reviewed_by_admin_id | UUID (FK → users.id), nullable | |
| reviewed_at | TIMESTAMP, nullable | |
| created_at | TIMESTAMP | |

### 6. `listing_interests`
Tracks a buyer expressing interest in a listing — the v1 version of "contact".

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | |
| listing_id | UUID (FK → listings.id) | |
| buyer_id | UUID (FK → users.id) | |
| message | TEXT, nullable | Optional note from the buyer |
| created_at | TIMESTAMP | |

## Relationships (text diagram)

```
users (miner) 1---* listings
users (buyer) 1---* verifications
users (admin) 1---* verifications        (as reviewer)
users (admin) 1---* mineral_prices       (as the one who set the price)

minerals 1---* mineral_prices
minerals 1---* listings

listings 1---* listing_interests
users (buyer) 1---* listing_interests
```

Read as: one miner can have many listings; one mineral can have many recorded prices over time (its history); one listing can receive interest from many buyers.

## Open Questions / Assumptions to Review

- ASSUMPTION — needs review: whether a miner needs their own verification step (currently only buyers are verified in this design).
- ASSUMPTION — needs review: whether `listing_interests` should eventually become a full messaging/chat table, or stay as a simple "interest expressed" record for v1.
- ASSUMPTION — needs review: price history granularity — daily updates vs. only updated when an admin changes it.
