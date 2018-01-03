import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import {
  user,
  users,
  addUser,
  updateUser,
  deleteUser
} from './User/user.controller'

// -- Root Query
const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: user,
    users: users
  }
});

// -- Root Mutation
const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser: addUser,
    updateUser, updateUser,
    deleteUser: deleteUser
  }
});

export default new GraphQLSchema({query, mutation});