# Use Node.js 20 base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Ensure the app builds correctly
RUN npm run build

# Set the default command to start the app
CMD ["node", "dist/main.js"]
