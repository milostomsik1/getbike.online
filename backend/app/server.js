import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { requireAuth, requireAdmin } from './auth';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import schema from './schema';
import Sequelize from 'sequelize';
import models from './models/index';
require('../polyfill');

// -- Setup Express
const server = express();

// -- Console Logging
server.use(morgan('dev'));

// -- Enable CORS
server.use(cors());

// -- Attach User Authorization To Context
server.use(process.env.GRAPHQL_ENDPOINT, (req, res, next) => {
  models.requireAuth = () => requireAuth(req);
  models.requireAdmin = () => requireAdmin(req);
  next();
});

// -- Apollo GraphQL setup
server.use(bodyParser.json());
server.use(process.env.GRAPHQL_ENDPOINT, graphqlExpress({ schema, context: models }));
server.get(process.env.GRAPHIQL_ENDPOINT, graphiqlExpress({ endpointURL: process.env.GRAPHQL_ENDPOINT }));

models.sequelize.sync().then(() => {
  // -- Run seeder if test db
  if (process.env.TESTING) {
    require('../seeder/seed');
  }
  // -- Listen to requests
  server.listen(process.env.DB_PORT, () => {
    console.log(`Listening for requests on localhost:${process.env.DB_PORT}`)
  });
});
