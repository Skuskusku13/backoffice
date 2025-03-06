FROM node:20 AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json /app/

RUN pnpm install

COPY . .

RUN pnpm run build

FROM httpd:2.4

ENV APACHE_LOG_DIR=/var/log/apache2

WORKDIR /usr/local/apache2/htdocs

COPY ./docker-config/apache-config.conf /etc/apache2/sites-enabled/000-default.conf

COPY --from=build /app/dist/backoffice/browser/ /usr/local/apache2/htdocs

