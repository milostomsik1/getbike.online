import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
