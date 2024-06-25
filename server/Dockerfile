FROM node:20 

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

# Generate Prisma client
RUN npm run db:generate

EXPOSE 8080

CMD ["sh", "-c", " npm run db:push && npm run db:seed && npm run dev"]