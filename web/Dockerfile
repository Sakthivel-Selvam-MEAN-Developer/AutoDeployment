FROM node:21.5.0-alpine3.18 as builder

# create a directory inside the container'
RUN mkdir -p /app
COPY ../ /app

## Set the working directory to /app
WORKDIR /app

RUN yarn install

# Final stage
FROM nginx:1.25.3-alpine3.18

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder app/dist /usr/share/nginx/html

EXPOSE 80