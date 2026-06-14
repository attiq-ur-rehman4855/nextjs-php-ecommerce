FROM php:8.2-apache

# MySQL extensions install karne ke liye (Aiven connection ke liye zaroori hai)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Aapka saara code Apache ki public directory mein copy karne ke liye
COPY . /var/www/html/

# Apache ports set karna
EXPOSE 80