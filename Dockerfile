# Use the official Node.js 14 image as the base image
FROM node:14

# Set environment variables for configuration and defaults
ENV NODE_ENV=production
ENV PORT=3000

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the specified port
EXPOSE $PORT

# Set labels for better maintainability
LABEL maintainer="Your Name <your-email@example.com>"
LABEL version="1.0"
LABEL description="Docker image for React 18"

# Set the command to run when the container starts
CMD [ "npm", "start" ]