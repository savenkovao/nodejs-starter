FROM node:18
ENV APP_PATH /glassbox-mc
WORKDIR $APP_PATH
COPY ./package*.json ./
COPY ./lerna.json ./
RUN npm install
COPY ./packages/fastify-web ./packages/fastify-web
RUN npx lerna bootstrap
RUN npm run build
EXPOSE 8000
CMD [ "npm", "--prefix", "packages/fastify-web", "run", "prod" ]