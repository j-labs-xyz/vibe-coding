# Base Image
FROM node:20-alpine AS base

# Builder Stage
FROM base AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/
RUN npm install
COPY . .
# Next.js requires access to public env vars at build time if used
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build -w apps/web

# Runner Stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/apps/web/next.config.ts ./
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "apps/web/server.js"]
