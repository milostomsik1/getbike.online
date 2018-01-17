import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config/db';
import bodyParser from 'body-parser';
import schema from './App/graphql.schema'

// -- Setup Express
const server = express();
process.env.SECRET_KEY = config.secretKey;

// -- Connect to MongoDB
mongoose.Promise = global.Promise
mongoose.connect(config.databaseUrl, { useMongoClient: true })

// -- Console Logging
server.use(morgan('dev'));

// -- Apollo GraphQL setup
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// -- Listen to requests
server.listen(process.env.port || config.port, () => {
  console.log(`Listening for requests on localhost:${config.port}`)
});
