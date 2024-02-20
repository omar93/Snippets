# Node version image
FROM node:21-alpine3.18

# Create app directory
WORKDIR /app

# Enviorment variables
ENV connectionString='mongodb://root:password@192.168.1.200:27017/'
ENV port=8000

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source and static public files
COPY public /app/public
COPY src /app/src

WORKDIR /app/src

EXPOSE 8000
CMD [ "node", "server.js" ]