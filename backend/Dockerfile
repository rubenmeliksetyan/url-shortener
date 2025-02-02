# Use the latest Node.js version
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --only=production

# Copy the rest of the app code
COPY . .

# Set environment
ENV NODE_ENV=production

# Expose the app on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]