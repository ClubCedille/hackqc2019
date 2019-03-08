FROM node:latest

EXPOSE 5000

COPY . .
COPY package*.json ./

RUN npm i --quiet
RUN npm i -g pm2 babel-cli

CMD pm2-dev pm2.yml