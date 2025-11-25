FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
# This Dockerfile sets up a Node.js application environment using the official Node.js 16 Alpine image.
