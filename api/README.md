# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

*   Node.js - version 8.x or greater
*   PostgreSQL
*   Redis

## Installing

First fork and clone the repo

Then:

```sh
$ cd PATH/TO/PROJECT/API
$ npm install
```

Now you must set up environment variables

Create an .env file in the root `API` directory:

```sh
$ touch .env
```

Put these environment variables in the `.env` file with your relevant information:

```
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=YOUR_USER
DB_PASS=YOUR_PASS
DB=YOUR_DB
JWT_KEY=YOUR_JWT_KEY
REDIS_HOST=127.0.0.1
REDIS_PORT=62105
REDIS_PASS=YOUR_REDIS_PASS
REDIS_DB=YOUR_REDIS_DB
SERVER_HOST=localhost
SERVER_PORT=3001
```

If you haven't set up your database yet, then you can run these commands to quickly bootstrap one up with seeded data:

```sh
$ knex migrate:latest
$ knex seed:run
```

To run locally:

```sh
$ npm run dev
```

Then go to `localhost:3001/documentation`

## Deployment to OpenShift

First log in with your oc credentials:

```sh
$ oc login
```

Then simply run this command in the git's root directory to deploy:

```sh
$ oc new-app bucharestgold/centos7-s2i-nodejs:latest~git@GIT_REPO_GOES_HERE --name NAME_GOES_HERE --context-dir=api
```

This will automatically pull an updated NodeJS image and target the source code in this repo for OpenShift.

## Built With

*   [Node.js](https://nodejs.org/en/) - The JavaScript runtime used
*   [Hapi](https://hapijs.com/) - Web framework for Node.js
*   [Knex](http://knexjs.org/) - Template engine
*   [Swagger](https://swagger.io/) - API documentation
*   [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that allows for types
*   [PostgreSQL](https://www.postgresql.org/) - SQL database
