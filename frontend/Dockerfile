FROM node:21.1.0

WORKDIR /usr/src/app

COPY frontend/package.json ./

COPY frontend/package-lock.json ./

RUN npm install --production=false

COPY frontend/ ./

EXPOSE 3000

CMD ["npm", "start"]