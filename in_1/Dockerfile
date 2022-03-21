FROM node

WORKDIR /app

COPY package*.json ./

#download and install dependecies
RUN npm install 

# RUN npm install mongodb
# RUN npm init

COPY . .

EXPOSE 9080

#setup the startup command 

CMD [ "node ","index.js" ]