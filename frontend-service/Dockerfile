# Build Stage
FROM node:lts-slim AS build
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Run Stage
FROM nginx:stable
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/chat-service /usr/share/nginx/html
