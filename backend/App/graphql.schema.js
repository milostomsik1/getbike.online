import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './graphql.typedefs';
import resolvers from './graphql.resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
