FROM node:20-alpine

WORKDIR /e2e

COPY package.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "test:e2e"]
