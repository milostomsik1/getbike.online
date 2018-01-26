import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import express from 'express';
import morgan from 'morgan';
import config from './config/db';
import bodyParser from 'body-parser';
import schema from './App/graphql.schema';
import Sequelize from 'sequelize';
import models from './App/models/index';

// -- Setup Express
const server = express();
// process.env.SECRET_KEY = config.secretKey;

// -- Console Logging
server.use(morgan('dev'));

// -- Apollo GraphQL setup
server.use(config.GraphQLEndpoint, bodyParser.json(), graphqlExpress({ schema, context: models }));
server.get('/graphiql', graphiqlExpress({ endpointURL: config.GraphQLEndpoint }));

models.sequelize.sync({force: true}).then(() => {
  // -- Listen to requests
  server.listen(process.env.port || config.port, () => {
    console.log(`Listening for requests on localhost:${config.port}`)
  });
});

