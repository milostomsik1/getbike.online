import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { requireAuth, requireAdmin } from './auth';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/db';
import bodyParser from 'body-parser';
import schema from './app/graphql.schema';
import Sequelize from 'sequelize';
import db from './app/models/index';

// -- Set .env Variables
require('dotenv').config();

// -- Setup Express
const server = express();

// -- Console Logging
server.use(morgan('dev'));

// -- Enable CORS
server.use(cors());

// -- Authorize User
server.use('/graphql', (req, res, next) => {
  db.requireAuth = () => requireAuth(req);
  db.requireAdmin = () => requireAdmin(req);
  next();
});

// -- Apollo GraphQL setup
server.use(process.env.GRAPHQL_ENDPOINT, bodyParser.json(), graphqlExpress({ schema, context: db }));
server.get('/graphiql', graphiqlExpress({ endpointURL: process.env.GRAPHQL_ENDPOINT }));

db.sequelize.sync().then(() => {
  // -- Run seeder if test db
  if (process.env.TEST_DB_NAME) {
    const seed = require('./seeder/seed');
  }
  // -- Listen to requests
  server.listen(process.env.DB_PORT, () => {
    console.log(`Listening for requests on localhost:${process.env.DB_PORT}`)
  });
});

