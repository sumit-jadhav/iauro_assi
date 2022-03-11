FROM node:9-slim

WORKDIR G:\gitlearning\API_learn\customer

COPY package*.json ./

RUN npm install 
# RUN npm init
# RUN npm i express
# RUN npm i -g nodemon

COPY . .
# ENV PORT=3400

EXPOSE 3400

CMD ["nodemon", "index.js"]