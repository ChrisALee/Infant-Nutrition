FROM node:alpine

EXPOSE 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile --no-cache

# Bundle app source
COPY . /usr/src/app