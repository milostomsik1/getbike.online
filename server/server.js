import express from 'express';
import mongoose from 'mongoose';
import config from './config/db';
import graphqlHTTP from 'express-graphql';

// -- Setup Express
const server = express();
process.env.SECRET_KEY = config.secretKey;

// -- Connect to MongoDB
mongoose.connect(config.databaseUrl)
mongoose.Promise = global.Promise

// -- GraphQL setup
server.use('/graphql', graphqlHTTP({
  schema: {},
  graphiql: true
}));

// -- Listen to requests
server.listen(process.env.port || config.port, () => {
    console.log(`Listening for requests on localhost: ${config.port}`)
  });