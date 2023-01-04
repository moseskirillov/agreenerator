FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build
FROM nginx:stable-alpine
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf