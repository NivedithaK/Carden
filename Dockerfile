# Base image
FROM node
# Make folder to put our files in
RUN mkdir -p /usr/src/app
# RUN mkdir -p /usr/src/app/server
# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app
# Copy package json and install dependencies
COPY server/package*.json ./
RUN npm install
# Copy our app
COPY server/ .
# Expose port to access server
EXPOSE 5000
# Command to run our app
# CMD [ "npm", "run", "local"] 
CMD [ "npm", "start"] 