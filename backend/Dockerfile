# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install Yarn
RUN npm install -g yarn

# Copy package files
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Generate Prisma Client
RUN yarn prisma:generate

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install Yarn
RUN npm install -g yarn

# Copy package files and install production dependencies
COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --frozen-lockfile --production=true

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api', (r) => {process.exit(r.statusCode === 404 ? 0 : 1)})"

# Start application
CMD ["node", "dist/main.js"]

