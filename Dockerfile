FROM node:alpine

RUN apk add --no-cache tini

WORKDIR /usr/app

ENV HTTP_PORT=5500
ENV HTTPS_PORT=5600
ENV DB_URI=mongodb://admin:adminpass@mongo-node:27017

EXPOSE ${HTTP_PORT}
EXPOSE ${HTTPS_PORT}

COPY package*.json ./

RUN npm install && npm install -g typescript

COPY . .

RUN tsc

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","./dist/main.js"]



