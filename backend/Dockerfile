
# ---- Build Stage ----
FROM node:current-alpine3.22 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build TypeScript
RUN npx tsc --project tsconfig.json

# ---- Production Stage ----
FROM node:current-alpine3.22 AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files from build stage
COPY package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev && npm cache clean --force

# Use non-root user for security (optional, but recommended)
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser

CMD ["node", "dist/index.js"]
