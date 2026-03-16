# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy built app + deps needed to run
COPY --from=build /app ./

# Ensure Next cache is writable at runtime
RUN mkdir -p /app/.next/cache/images \
  && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start"]