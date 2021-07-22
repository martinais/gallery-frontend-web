FROM node:15-alpine AS build

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build 

FROM nginx AS prod

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
