FROM node:current-alpine3.22 AS backend

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev \
    && npm cache clean --force
    
COPY . .

RUN npm run build

FROM node:current-alpine3.22 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev \
    && npm cache clean --force

COPY --from=backend /app/dist ./dist
COPY --from=backend /app/node_modules ./node_modules
COPY --from=backend /app/package.json ./
COPY --from=backend /app/package-lock.json ./


CMD ["node", "dist/index.js"]
