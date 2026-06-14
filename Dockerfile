FROM php:8.2-apache

# MySQL extensions install karne ke liye
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Sirf backend folder ke code ko Apache ki public directory mein copy karein
COPY backend/ /var/www/html/

# Apache ports set karna
EXPOSE 80