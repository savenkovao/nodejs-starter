FROM node:18
ENV APP_PATH /glassbox-ms
WORKDIR $APP_PATH
COPY ./package*.json ./
COPY ./lerna.json ./
RUN npm install
COPY ./packages/cassandra-web ./packages/cassandra-web
COPY ./packages/base ./packages/base
RUN npx lerna bootstrap
RUN npm run build:base
RUN npm run build:cassandra-web
EXPOSE 8000
CMD [ "npm", "--prefix", "packages/cassandra-web", "run", "prod" ]