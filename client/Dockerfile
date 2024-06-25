FROM node:20 AS base

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]