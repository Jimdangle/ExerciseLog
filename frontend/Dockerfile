FROM node:alpine
WORKDIR /react/
COPY package*.json ./

RUN npm install
COPY . .

CMD ["npm", "run", "dev"]