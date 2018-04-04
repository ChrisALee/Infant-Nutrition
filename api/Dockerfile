FROM node:alpine

EXPOSE 3001

# Create app directory
RUN mkdir -p /usr/src/api-app
WORKDIR /usr/src/api-app

COPY wait-for-postgres.sh .
# Install app dependencies
COPY package.json yarn.lock /usr/src/api-app/
RUN yarn install --frozen-lockfile --no-cache
RUN yarn global add knex

# Bundle app source
COPY . /usr/src/api-app