# Coffee List

## ENV variables
Create `.env` file with your AWS credentials to have access to the S3 bucket.
If you don't have it just write me private message and I'll share it.
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_...
AWS_REGION=eu-north-...
AWS_S3_BUCKET_NAME=...
```
## Scripts

The following scripts are here to help you get up and running in a development environment as quickly as possible.

### Installation

```bash
$ yarn install
```

### Running the database with docker

If you have docker installed on your machine, we have provided a script to easily spin up
a Postgres database.

```bash
$ yarn start:dev:db
```

### Running your own Postgres database

If you don't want to use docker, you can configure this by yourself. You will need to have Postgres installed. We will however use the Dockerfile when reviewing/running your backend code. Therefore, for us to easily run your project, please use the following configuration:

```
host: 'localhost'
port: 5432
username: 'postgres'
password: '1234'
database: 'coffee-db'
```

### Running the project in development mode

```bash
# Will run on port 5555
$ yarn start:dev
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
