import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';
import config from './config/db';
import schema from './App/graphql.schema'

// -- Setup Express
const server = express();
process.env.SECRET_KEY = config.secretKey;

// -- Connect to MongoDB
mongoose.Promise = global.Promise
mongoose.connect(config.databaseUrl, { useMongoClient: true })

// -- Console Logging
server.use(morgan('dev'));

// -- GraphQL setup
server.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// -- Listen to requests
server.listen(process.env.port || config.port, () => {
  console.log(`Listening for requests on localhost:${config.port}`)
});
