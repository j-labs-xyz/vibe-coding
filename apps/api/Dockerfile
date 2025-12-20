# Base Image
FROM node:20-alpine AS base

# Builder Stage
FROM base AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/
# Install dependencies for all workspaces
RUN npm install
# Copy source code
COPY . .
# Generate Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma || true
# Build API
RUN npm run build -w apps/api

# Runner Stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built artifacts and node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

EXPOSE 3001
CMD ["npm", "run", "start:prod", "-w", "apps/api"]
