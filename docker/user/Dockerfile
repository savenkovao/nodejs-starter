FROM node:18
ENV APP_PATH /glassbox-ms
WORKDIR $APP_PATH
COPY ./package*.json ./
COPY ./lerna.json ./
RUN npm install
COPY ./packages/user ./packages/user
COPY ./packages/base ./packages/base
RUN npx lerna bootstrap
RUN npm run build:base
RUN npm run build:user
EXPOSE 8000
CMD [ "npm", "--prefix", "packages/user", "run", "prod" ]