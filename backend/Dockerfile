# Backend Dockerfile

# Step 1: Use an official Node.js image as a parent image
FROM node:20.10

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose port 5000 (or whatever port your backend runs on)
EXPOSE 5000

# Step 7: Start the backend server
CMD ["npm", "start"]
