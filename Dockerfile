# Use official Node.js image as base
FROM node:14

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (if applicable)
RUN npm run build

# Expose port (adjust if necessary)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]