FROM node:alpine

WORKDIR /app

RUN npm config set unsafe-perm true 
RUN npm install -g graphql-cli prisma nodemon
RUN apk update && apk add bash


COPY package.json ./

RUN npm install

COPY . .

RUN chmod -R +x ./docker-scripts/

EXPOSE 4002

ENTRYPOINT [ "./docker-scripts/entrypoint.sh" ]