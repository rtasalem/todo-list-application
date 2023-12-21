FROM node:21.1.0

WORKDIR /usr/app

COPY backend/package.json ./

COPY backend/package-lock.json ./

RUN npm install --production=false

COPY backend/ ./

EXPOSE 8088

CMD ["node", "index.js"]