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

// -- Setup Express
const server = express();

// -- Console Logging
server.use(morgan('dev'));

// -- Enable CORS
server.use(cors());

// -- Apollo GraphQL setup
server.use(config.GraphQLEndpoint, bodyParser.json(), graphqlExpress({ schema, context: db }));
server.get('/graphiql', graphiqlExpress({ endpointURL: config.GraphQLEndpoint }));

db.sequelize.sync().then(() => {
  // -- Run seeder if test db
  if (process.env.TEST_DB_NAME) {
    const seed = require('./seeder/seed');
    console.log('seeding')
  }
  // -- Listen to requests
  server.listen(config.port, () => {
    console.log(`Listening for requests on localhost:${config.port}`)
  });
});

