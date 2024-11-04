# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5173 to make it accessible from the host
EXPOSE 5173

# Wait for the backend to be ready before starting
CMD ["sh", "-c", "until curl http://library-app:3000; do echo 'Waiting for backend...'; sleep 5; done; npm run dev"]
