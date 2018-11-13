FROM nginx:1.15.6-alpine

COPY ./nginx /etc/nginx/
COPY ./dist/codypaste /usr/share/nginx/html/
