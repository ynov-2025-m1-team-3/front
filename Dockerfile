# Étape de build
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SENTRY_AUTH_TOKEN=$VITE_SENTRY_AUTH_TOKEN


RUN npm ci
COPY . .
RUN npm run build

# Étape de production avec Nginx
#
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
