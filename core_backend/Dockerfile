# Use Node.js 20 base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Generate Prisma client during the build phase
RUN npx prisma generate

# Start the service with a script that waits for the database to be ready
CMD ["sh", "-c", "until nc -z postgres 5432; do echo 'Waiting for Postgres...'; sleep 2; done; npx prisma migrate dev && npm run start:dev"]

