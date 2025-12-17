# Vibe Coding Monorepo

This monorepo contains a Next.js web application and a NestJS API, orchestrated with Docker Compose for infrastructure.

## Stack
- **Web**: Next.js (TypeScript, Tailwind, ESLint)
- **API**: NestJS (TypeScript, Prisma, IORedis)
- **Database**: PostgreSQL (Dockerized)
- **Cache**: Redis (Dockerized)

## Prerequisites
- Node.js (v18+)
- Docker & Docker Compose

## One-Command Start
Run everything (install, db setup, start apps) with a single command:
```bash
./start.sh
```

## Manual Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Infrastructure (Postgres & Redis)**
   ```bash
   docker-compose up -d
   ```

3. **Initialize Database**
   Go to the API directory to set up Prisma:
   ```bash
   cd apps/api
   npx prisma migrate dev --name init
   npx prisma db seed
   cd ../..
   ```

4. **Run Applications**
   Run both apps (requires `concurrently` if configured in root, or run separately):
   
   **Web (Next.js)**:
   ```bash
   npm run dev -w apps/web
   ```
   Runs on [http://localhost:3000](http://localhost:3000)

   **API (NestJS)**:
   ```bash
   npm run start:dev -w apps/api
   ```
   Runs on [http://localhost:3000](http://localhost:3000) (Wait, default is 3000, Next.js is 3000. You need to change API port!)

   *Note: Next.js and NestJS both default to port 3000. Configuring API to port 3001.*

## Configuration
- **API Port**: Update `apps/api/src/main.ts` to listen on 3001.
- **Environment**: 
  - `apps/api/.env`: `DATABASE_URL="postgres://vibe_user:vibe_password@localhost:5432/vibe_db"`
