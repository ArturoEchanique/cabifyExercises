FROM node:latest

# EXPOSE 9001

# COPY package*.json ./

COPY . ./

RUN npm install


# CMD ["npm", "start"]
CMD ["node", "server.js"]