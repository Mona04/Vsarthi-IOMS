# Use the official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the development server port 
EXPOSE 5173

# Default command to run the dev server
CMD ["npm", "run", "dev"]