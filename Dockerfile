FROM node:10 AS dependency-installer
COPY package*.json .
RUN ["npm", "install"]

FROM dependency-installer AS builder
COPY css css
COPY fonts fonts
COPY img img
COPY src src
COPY stylus stylus
COPY views views
COPY *.js .
COPY *.json .
COPY CNAME .
COPY *.xml .
RUN ["./node_modules/.bin/grunt", "build-website"]

FROM nginx:alpine AS runner
COPY --from=builder dist/website /usr/share/nginx/html