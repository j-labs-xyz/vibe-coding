## Now do this first

- Generate the working monorepo scaffold (Next.js web + NestJS API + Postgres + Prisma + Redis + docker-compose).
- Create seed demo data and run instructions.
- Do NOT run terminal commands automatically; instead show me the exact commands to run.
- Keep all edits inside this workspace folder only.

## Architecture

- We call it Vastlink v2.0, a finance operating system.
- It is modular and composable, modules are loosely coupled and communicate via a message queue.
- It has the following modules:
  - Authentication and authorization
  - User management
  - Double-entry ledger
  - Payments and transfers
  - FX
  - Virtual account that supports both fiat and crypto
  - Team workflow (e.g.: role-based approval and rejection)
  - Compliance and regulation
  - Reporting
- Modules are implemented from scratch or by integrating with 3rd-party services.