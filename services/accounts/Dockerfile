FROM node:12.18.3-alpine3.12

WORKDIR /app

RUN npm config set unsafe-perm true 
RUN npm install -g graphql-cli prisma nodemon
RUN apk update && apk add bash


COPY package.json ./

RUN npm install

COPY . .

RUN chmod -R +x ./docker-scripts/

EXPOSE 4001

ENTRYPOINT [ "./docker-scripts/entrypoint.sh" ]