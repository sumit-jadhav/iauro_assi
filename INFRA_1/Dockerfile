# # FROM node
# FROM node:erbium-alpine

# WORKDIR /app

# COPY package*.json ./

# #download and install dependecies
# RUN npm install 

# # RUN npm install mongodb
# # RUN npm init

# COPY . .

# EXPOSE 9080

# #setup the startup command 

# CMD [ "node ","index.js" ]

FROM node:17-alpine3.14
WORKDIR /app
COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 9080
CMD ["node", "index.js"]

