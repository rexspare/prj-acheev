console.info("imports");
import http from 'http';
import express, { Application, NextFunction, Response } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import {
  errorDelivery,
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
} from './shared/middleware';
import { apiRouter } from './apiRouter';
import { applyMiddleware, } from './shared/utilities';
import { createApolloServer } from './gql/gqlServerInitializer';
import knexFile from '../knexfile';
import { UserModel } from './models/userModel';
import { startCronService } from './services/cronService';
import { S3Router } from './vendor/s3router';
import aws from 'aws-sdk';
import path from 'path';

const { PORT, NODE_ENV, S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_REGION, npm_package_version } = process.env;

const knex = Knex(knexFile[NODE_ENV || 'development']);

const migrateAndSeed = async () => {
  // if (isDevEn()) {
  //   knex.migrate
  //     .status()
  //     .then(count => {
  //       if (count === 0) {
  //         return console.info('No pending migrations');
  //       }

  //       return console.warn(`Database is ${Math.abs(count)} migrations ${count > 0 ? 'ahead' : 'behind'}`);
  //     })
  //     .catch(err => console.error('Failed to check migration status of database!', err));
  // } else {
  //   console.log("Migrating to latest automatically");
  //   await knex.migrate.latest();

  // }
  Model.knex(knex);
  if ((await UserModel.query()).length === 0) {
    await knex.seed.run();
  }

  startCronService();
}

migrateAndSeed().catch(err => {
  console.error(err)
});

const app: Application = express();
app.set('port', PORT);

applyMiddleware(
  [handleCors, handleBodyRequestParsing, handleCompression],
  app,
);
app.use('/api', apiRouter);
app.use(errorDelivery);

process.on('uncaughtException', async (error: Error) => {
  console.error(error);
});

app.get('/', (req, res) => {
  return res.json({ name: 'acheev-api', version: npm_package_version });
});

const getSchema = (res: Response, next: NextFunction) => {
  const options = {
    root: path.join(__dirname)
  };

  console.error(path.join(__dirname));
  return res.sendFile('gqlTypes/schema.graphql', options, function (err) {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
}

app.get('/schema', (req, res, next) => {
  return getSchema(res, next);
});

app.get('/schema.graphql', (req, res, next) => {
  return getSchema(res, next);
});

try {
  console.info(`Updating AWS Config`);
  aws.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: S3_REGION
  });

  console.info('Configuring S3');
  app.use('/api/s3', S3Router({
    bucket: S3_BUCKET ?? "NOT_FOUND",
    headers: { 'Access-Control-Allow-Origin': '*' },
    ACL: 'private', // this is default
    signatureVersion: 'v4',
    expires: 300,
    uniquePrefix: true, // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
    region: S3_REGION ?? "NOT_FOUND"
  }));
  console.info('S3 configured');
} catch (err) {
  console.error("Failed to setup s3");
}

const server = http.createServer(app);
const gqlServer = createApolloServer(server);
gqlServer.start().then(() => gqlServer.applyMiddleware({ app, path: '/gql' })).catch(console.error);

server.listen(PORT, () => {
  console.info(`The server is running at ${PORT}`);
});

