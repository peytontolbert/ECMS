FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=555

EXPOSE 555

CMD [ "npm", "start" ]