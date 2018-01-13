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

import {
  ad,
  ads,
  deleteAd
} from './Ad/ad.controller';

// -- Root Query
const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: user,
    users: users,
    ad: ad,
    ads: ads
  }
});

// -- Root Mutation
const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser: addUser,
    updateUser, updateUser,
    deleteUser: deleteUser,
    deleteAd: deleteAd
  }
});

export default new GraphQLSchema({query, mutation});