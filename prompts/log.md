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

## UI/UX

- Implement the following functions in front-end
  - Authentication and authorization
  - User management
  - Double-entry ledger
  - Payments and transfers
  - FX
  - Virtual account that supports both fiat and crypto
  - Team workflow (e.g.: role-based approval and rejection)
  - Compliance and regulation
  - Reporting

## Fine tune UI

Apply logo to `apps/web/public/logo_megalith.jpeg`, and use its black and gold as the theme for the web app.

Use the logo as favicon

## Sign up, sign in, and sign out

```
- In `web`, please implement sign up, sign in, and sign out
- You don't need to build everything from scratch, just integrate with well established authentication platforms like Stytch (https://stytch.com/) and Auth0 (https://auth0.com/)
- You would need to architect the authentication module properly, first level is a abstract authentication interface, and it has 2 specific implementations, Stytch and Auth0, and we can choose which one to use via .env settings. Also can easily add new platforms in the future.
- The following are Stytch and Auth0 settings for .env

Stytch

Project ID
project-test-59f1dfa9-be9c-4bc5-a367-ebf8b29312f8

Project Domain
https://literate-lantern-8091.customers.stytch.dev

Project Slug
my-first-project

Environment Slug
vastlink-20-test-aesp

Workspace ID
workspace-prod-e59cd3df-d3ff-4b67-aaf3-724e516f837f

Secret
secret-test-SStx0RnGGzcSRmReI4LPjMlrOCuzm7cLe4Q=

Auth0

Domain
dev-qxbx8jd74ps0lupw.us.auth0.com

Client ID
yOBD48BzULaYPdbMO3JDy2uxmeQjtJvm

Client Secret
h6CjA5mlTmyMZQgcHEMNHjbPxNQ9Hd90W7LyT54BPdFbFuHYmOzmjH0DSnsnEm39
```