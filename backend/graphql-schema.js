import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import { user, users } from './User/user.controller'

// -- Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: user,
    users: users
  }
});

export default new GraphQLSchema({
  query: RootQuery
});