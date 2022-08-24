FROM node:18
ENV APP_PATH /glassbox-ms
WORKDIR $APP_PATH
COPY ./package*.json ./
COPY ./lerna.json ./
RUN npm install
COPY ./packages/worker ./packages/worker
RUN npx lerna bootstrap
RUN npm run build
EXPOSE 8000
CMD [ "npm", "--prefix", "packages/worker", "run", "prod" ]