FROM node:21.1

WORKDIR /usr/app

COPY backend/package*.json ./

RUN npm install

COPY backend/ ./

EXPOSE 3000

CMD ["node", "index.js"]