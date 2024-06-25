FROM node:20 AS base

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Update the db schema 
RUN npx prisma db push

# Seed the database
RUN npx tsx prisma/seed.ts

EXPOSE 8080
CMD [ "npm", "run", "dev" ]