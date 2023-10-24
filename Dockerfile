FROM node

WORKDIR /usr/src/app

RUN npm i -g nodemon
RUN mkdir -p /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]