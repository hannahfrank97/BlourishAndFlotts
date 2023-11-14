FROM node:latest

# make the 'app' folder the current working directory
WORKDIR /usr/src/app

# copy both 'package.json' and 'package-lock.json' (if available)
ADD package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 3000
CMD [ "node", "app.js"]