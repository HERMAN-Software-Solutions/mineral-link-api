# Roadmap — Mineral Link (3-Month Internship)

This is a working plan and will likely shift as real progress and blockers come up. It is organized by month, then by week.

## Month 1 — Foundation and Core Backend

- **Week 1**: Finish documentation (this task). Get mentor review and sign-off before writing code. Set up both repositories properly with branch protection.
- **Week 2**: Scaffold the API project (Express + TypeScript project structure, folder layout from `ARCHITECTURE.md`). Set up the database and create the tables from `DATABASE_DESIGN.md`.
- **Week 3**: Build user accounts — signup, login, and role assignment (miner/buyer/admin) in the API. Add authentication.
- **Week 4**: Build the listings feature in the API — create, view, and update listing status. Write basic tests for these endpoints.

## Month 2 — Frontend and Connecting the Pieces

- **Week 5**: Scaffold the Next.js frontend project structure. Build the signup/login pages and connect them to the API.
- **Week 6**: Build the miner-facing pages — view prices, create a listing, see listing status.
- **Week 7**: Build the buyer-facing pages — browse listings, filter by mineral/region, express interest in a listing.
- **Week 8**: Build the admin-facing pages — review buyer verification requests, update reference prices.

## Month 3 — Verification, Polish, and Presentation

- **Week 9**: Build the full buyer verification flow end-to-end (submit → admin review → approve/reject → buyer notified).
- **Week 10**: Testing pass — go through the core loop as each role (miner, buyer, admin) and fix bugs found along the way.
- **Week 11**: Polish — improve error handling, empty states (e.g. "no listings yet"), and basic mobile responsiveness on the frontend.
- **Week 12**: Final review, write-up of what was built vs. the original v1 scope, and prepare a demo/presentation of Mineral Link.

## Personal Goals by the End of the Internship

- Be able to build a full-stack feature (database table → API endpoint → frontend page) independently, from a written spec.
- Understand and be able to explain the reasoning behind the routes → controllers → services → models structure, not just follow it.
- Be comfortable with Git workflows used on a real team — branching, pull requests, and clear commit messages — rather than just pushing directly to main.
- Leave the internship with a working v1 of Mineral Link that reflects the actual problem it was meant to solve, not just a checklist of features.

## Notes

- ASSUMPTION — needs review: this roadmap assumes roughly one core feature area per week. If verification or listings turn out to be more complex than expected, later weeks may need to shift.
