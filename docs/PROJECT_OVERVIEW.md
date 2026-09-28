# Project Overview — Mineral Link

## Vision

Mineral Link is a web platform built for Uganda's small-scale and artisanal mining sector. Right now, many miners have no reliable way to know what their gold, tin, or tungsten is actually worth on the wider market. That gap in information is what allows middlemen to buy minerals from miners at a price far below their real value, then resell to exporters or buyers at the true rate.

The vision for Mineral Link is to close that gap by giving miners two things at once: transparent, regularly updated pricing information for the minerals they produce, and a direct way to reach buyers and exporters who have been verified by the platform. Over time, the goal is for Mineral Link to become the trusted middle layer that middlemen currently occupy — except one that is transparent, fair, and works for the miner instead of against them.

This is not meant to replace human relationships or on-the-ground trading entirely. It is meant to give miners the information and access they need to negotiate fairly, whether they end up selling through the platform directly or simply use it to know what a fair price looks like.

## User Roles

### Miner
- Creates an account and a basic profile (name, location/region, minerals they produce).
- Views current, transparent pricing for gold, tin, and tungsten.
- Creates listings for minerals they have available to sell (mineral type, quantity, location).
- Can see which buyers have expressed interest in a listing.
- Can mark a listing as sold.

### Buyer / Exporter
- Creates an account and submits information for verification (e.g. business name, registration details — exact requirements are an ASSUMPTION — needs review).
- Once verified by an admin, can browse active listings from miners.
- Can filter listings by mineral type, region, or quantity.
- Can express interest in / contact a miner about a listing.

### Admin
- Reviews and approves or rejects buyer verification requests.
- Can view all listings and remove ones that violate platform rules (e.g. clearly fraudulent or duplicate listings).
- Manages/updates the reference pricing data shown to miners.
- ASSUMPTION — needs review: whether admins can also verify miners, or whether miner accounts are open by default.

## Core Features (v1 Scope Only)

This is intentionally a minimal first version. The goal is a working core loop, not every possible feature.

1. **Account creation and login** for miners and buyers, with role selection at signup.
2. **Reference pricing page** — shows current price per unit for gold, tin, and tungsten, updated by an admin (not yet a live market feed in v1 — that is a later-phase feature).
3. **Listing creation** (miner) — mineral type, quantity, location, and optional notes.
4. **Listing browsing** (buyer) — view and filter active listings.
5. **Buyer verification** (admin) — a simple approve/reject flow before a buyer can contact miners.
6. **Basic contact/interest flow** — a buyer can indicate interest in a listing, and the miner can see who is interested. ASSUMPTION — needs review: whether this is an in-app message, or simply reveals contact details once a buyer is verified.

### Explicitly Out of Scope for v1
- Live/automatic market price feeds (v1 uses admin-updated reference prices).
- In-app payments or escrow.
- Mobile app (v1 is web only).
- Multi-language support beyond English (ASSUMPTION — needs review, since many miners may not be most comfortable in English).
