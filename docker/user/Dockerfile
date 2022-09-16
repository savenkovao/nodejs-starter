FROM node:18 as base
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./

FROM base as base-build
WORKDIR /app/packages/base
COPY  packages/base/package-slim.json package.json
WORKDIR /app/
RUN npx lerna bootstrap --scope=base --includeDependencies
WORKDIR /app/packages/base
COPY  packages/base ./
RUN npm run build

FROM base as user-build
WORKDIR /app/packages/user
COPY  packages/user/package-slim.json package.json
WORKDIR /app/
COPY --from=base-build /app/packages/base/package.json /app/packages/base/
RUN npx lerna bootstrap --scope=user --includeDependencies
COPY --from=base-build /app/packages/base/ /app/packages/base/
WORKDIR /app/packages/user
COPY  packages/user ./
RUN npm run build

FROM base
COPY --from=base-build /app/packages/base /app/packages/base
COPY --from=user-build /app/packages/user /app/packages/user

EXPOSE 8000
CMD [ "npm", "--prefix", "packages/user", "run", "prod" ]