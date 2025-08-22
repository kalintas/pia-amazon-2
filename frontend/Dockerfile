FROM node:24-alpine AS build

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . ./

RUN ng build --configuration=production

FROM nginx:stable-alpine AS final

EXPOSE 80

COPY --from=build /app/dist/pia-internship-angular-app/browser /usr/share/nginx/html

# Optional: Copy custom Nginx config for Angular routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
