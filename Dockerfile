FROM node

WORKDIR /usr/app-service

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3334

CMD ["npm", "run", "dev"]