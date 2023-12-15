FROM node:latest

WORKDIR /usr/app

COPY backend/package.json ./

COPY backend/package-lock.json ./

RUN npm install --production=false

COPY backend/ ./

EXPOSE 3000

CMD ["node", "index.js"]