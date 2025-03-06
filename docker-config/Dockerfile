FROM node:20 AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json /app/

RUN pnpm install

COPY . .

RUN pnpm run build

FROM httpd:2.4

WORKDIR /usr/local/apache2/htdocs/

ENV APACHE_LOG_DIR=/var/log/apache2

# Copier la configuration du VirtualHost
COPY ./docker-config/apache-config.conf /usr/local/apache2/conf/extra/000-default.conf

# Configurer le VirtualHost dans le fichier de configuration principal Apache
RUN echo "Include /usr/local/apache2/conf/extra/000-default.conf" >> /usr/local/apache2/conf/httpd.conf

# S'assurer que le module rewrite est activé
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

COPY --from=builder /app/build /usr/local/apache2/htdocs/
