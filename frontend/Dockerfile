# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy yarn.lock e package.json da raiz do workspace
COPY yarn.lock package.json ./

# Copy package.json do frontend
COPY frontend/package.json ./frontend/package.json

# Copy source code do frontend
COPY frontend ./frontend

WORKDIR /app/frontend

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Build application
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

