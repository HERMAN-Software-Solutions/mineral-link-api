\# Prisma — Database Layer



\## What Prisma is and why we use it



Prisma is a tool that sits between our Node.js code and the PostgreSQL database. Instead of writing raw SQL to create tables and fetch rows, we describe our data once in `schema.prisma`, and Prisma uses that description to build the tables and to give our TypeScript code a typed client for reading and writing data.



We use it because it keeps the database design in one readable file, catches mistakes in data shapes before the code runs (which fits our TypeScript strict mode), and records every database change as a migration that can be repeated on any machine.



This project uses Prisma 7 (pinned in `package.json`).



\## Files in this folder



\- `schema.prisma` — the models (tables), enums and relations for Mineral Link

\- `migrations/` — the saved history of database changes, one folder per migration



The connection settings live in `prisma.config.ts` at the repo root, which reads `DATABASE\_URL` from `.env`.



\## Running migrations



1\. Make sure PostgreSQL is running and the `mineral\_link\_dev` database exists.

2\. Copy `.env.example` to `.env` and put in your real username and password.

3\. Run: `npm run db:migrate` (this is `prisma migrate dev`). For the very first migration we used `npx prisma migrate dev --name init`.



Each time the schema changes, run the migrate command again with a new name, so the change is recorded in `migrations/`.



To check the schema for mistakes without touching the database, run `npm run db:validate`.



\## Opening Prisma Studio



Run `npm run db:studio` (this is `prisma studio`). It prints a local address; open it in a browser to see every table and its columns. Stop it with Ctrl + C in the terminal.

