FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json ./
RUN npm install

COPY . .
RUN chmod +x entrypoint.sh init-search.sh

EXPOSE 8082
ENTRYPOINT ["./init-search.sh", "./entrypoint.sh"]
