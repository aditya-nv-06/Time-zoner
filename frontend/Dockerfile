# Frontend
FROM node:current-alpine3.22 AS frontend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --no-cache \ 
    && npm cache clean --force 


COPY . .

# Build the frontend application
RUN npm run build

FROM nginx:1.25-alpine-slim 

COPY --from=frontend /app/dist /usr/share/nginx/html


CMD ["nginx", "-g", "daemon off;"]

# Healthcheck

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

