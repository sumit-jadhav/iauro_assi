FROM node

WORKDIR G:\gitlearning\API_learn\Shopping-api

COPY package*.json ./

#download and install dependecies
RUN npm install 

# RUN npm install mongodb
# RUN npm init

COPY . .

EXPOSE 8080

#setup the startup command 

CMD [ "node ","index.js" ]