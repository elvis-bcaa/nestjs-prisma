## Description

An application writte on [Nest](https://github.com/nestjs/nest) framework and PostgreSQL DB with TypeScript and Prisma ORM.

> Note: Since we're using an online PostgreSQL DB (Neon) for this project, there's no need to create a DB instance locally.

## Installation

```bash
$ npm install

# rename .env.sample to .env
$ mv .env.sample .env
```

> Note that the above script to rename file is for linux based systems. For other systems, it might be different.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests: There are no e2e tests at the moment
$ npm run test:e2e

# test coverage: Only the schedule module is covered
$ npm run test:cov
```

> Note: I've written test cases for the schedule module. I have skipped test cases for Tasks and also skipped e2e test cases due to time constraints.
