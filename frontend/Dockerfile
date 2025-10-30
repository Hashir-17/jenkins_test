# Step 1: Use an official Node.js image as a parent image
FROM node:20.10

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Install serve globally to serve the built application
RUN npm install -g serve


EXPOSE 3000

# Step 8: Start the application
CMD ["serve", "-s", "build"]
