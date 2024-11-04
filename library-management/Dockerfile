# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) and install dependencies
COPY package*.json ./
RUN npm install && npm install -g typescript

# Copy the rest of the application code
COPY . .

# Transpile TypeScript to JavaScript
RUN npm run build

# Expose the application's port
EXPOSE 3000

# Run migrations before starting the application
CMD ["sh", "-c", "npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/InitialMigration -d src/config/data-source.ts && npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/config/data-source.ts && npm start"]
