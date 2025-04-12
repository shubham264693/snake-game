# Use the official Node.js image from Docker Hub
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]
