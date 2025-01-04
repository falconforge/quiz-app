# Use official Node.js image from Docker Hub
FROM node:18

# Install build dependencies for bcrypt and others
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

# Step 3: Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of your project files
COPY . .

# Step 6: Expose the port your app will run on (e.g., port 3000)
EXPOSE 3000

# Step 7: Command to start your app
CMD ["npm", "start"]