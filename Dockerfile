# Use Node.js 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend_mongo/package*.json ./backend_mongo/

# Install dependencies
RUN npm install
RUN cd frontend && npm install && npm run build
RUN cd backend_mongo && npm install

# Copy source files
COPY . .

# Create frontend-dist directory and copy build
RUN mkdir -p backend_mongo/frontend-dist
RUN cp -r frontend/dist/* backend_mongo/frontend-dist/

# Expose port
EXPOSE 4000

# Switch to backend directory and start
WORKDIR /app/backend_mongo

# Start the application
CMD ["npm", "start"]
