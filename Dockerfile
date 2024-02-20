# Node version image
FROM node:21-alpine3.18

# Create app directory
WORKDIR /usr/src/app

# Enviorment variables
ENV connectionString='mongodb://root:password@mongodb:27017/'
ENV port=8000

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "node", "server.js" ]