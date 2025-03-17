# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the Next.js build output
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]