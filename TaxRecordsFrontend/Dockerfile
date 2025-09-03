# build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# if your script is "build": "ng build"
RUN npm run build

# serve with nginx
FROM nginx:alpine
# nginx with SPA + API proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf
# adjust the dist path name if your project name differs
COPY --from=build /app/dist/tax-records-frontend/browser /usr/share/nginx/html
EXPOSE 4200
