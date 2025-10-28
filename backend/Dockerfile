# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy yarn.lock e package.json da raiz do workspace
COPY yarn.lock package.json ./

# Copy package.json do backend
COPY backend/package.json ./backend/package.json

# Copy prisma schema
COPY backend/prisma ./backend/prisma/

# Copy source code do backend
COPY backend ./backend

WORKDIR /app/backend

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Generate Prisma Client
RUN yarn prisma:generate

# Build application
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/package.json
COPY backend/prisma ./backend/prisma/

WORKDIR /app/backend

# Install production dependencies
RUN yarn install --frozen-lockfile --production=true

# Copy built application from builder
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api', (r) => {process.exit(r.statusCode === 404 ? 0 : 1)})"

# Start application
CMD ["node", "dist/main.js"]

