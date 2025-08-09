# Use the Node.js image as the base for building the React application.
FROM node:18-alpine AS build

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies.
# This leverages Docker's caching, so this step only runs if these files change.
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the React application for production.
RUN npm run build

# Use a lightweight Nginx image to serve the static files.
FROM nginx:alpine

# Copy the static files from the build stage into the Nginx directory.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to make the application accessible.
EXPOSE 80

# The command to run when the container starts.
CMD ["nginx", "-g", "daemon off;"]
