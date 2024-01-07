FROM node:21.5.0-alpine3.18

# create a directory inside the container'
RUN mkdir -p /app
COPY ../ /app/

## Set the working directory to /app
WORKDIR /app

RUN yarn install

# Expose the listening port of your app
EXPOSE 8000

