# =========================
# Stage 1: Build
# =========================
FROM node:24-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies (omit dev for production)
RUN npm install --omit=dev

# Copy the rest of the application source code
COPY . .

# Optional: Build step if your app needs it (e.g., React, TypeScript)
# RUN npm run build

# =========================
# Stage 2: Production
# =========================
FROM node:24-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose application port
EXPOSE 3000

# Health check endpoint (adjust path to match your app)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]
