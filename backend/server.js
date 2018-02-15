import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/db';
import bodyParser from 'body-parser';
import schema from './app/graphql.schema';
import Sequelize from 'sequelize';
import db from './app/models/index';
import jwt from 'jsonwebtoken';

// -- Setup Express
const server = express();

// -- Console Logging
server.use(morgan('dev'));

// -- Enable CORS
server.use(cors());


const authenticate = (isAuthenticated) => {
  if (!isAuthenticated) {
    throw new Error('Not authorized.');
  }
}

// -- Authorize User
server.use('/graphql', (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.slice(7) : null;
  const isAuthenticated = authHeader ? Boolean(jwt.verify(token, config.secret)) : false;
  db.authenticate = () => authenticate(isAuthenticated);
  next();
});

// -- Apollo GraphQL setup
server.use(config.GraphQLEndpoint, bodyParser.json(), graphqlExpress({ schema, context: db }));
server.get('/graphiql', graphiqlExpress({ endpointURL: config.GraphQLEndpoint }));

db.sequelize.sync().then(() => {
  // -- Run seeder if test db
  if (process.env.TEST_DB_NAME) {
    const seed = require('./seeder/seed');
  }
  // -- Listen to requests
  server.listen(config.port, () => {
    console.log(`Listening for requests on localhost:${config.port}`)
  });
});

