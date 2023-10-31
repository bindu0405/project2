FROM node:18.17.1
WORKDIR /usr/app
RUN npm i -g nodemon
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 8500
CMD npm start