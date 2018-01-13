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

import {
  category,
  categories,
  deleteCategory
} from './Category/category.controller';

// -- Root Query
const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: user,
    users: users,
    ad: ad,
    ads: ads,
    category: category,
    categories, categories
  }
});

// -- Root Mutation
const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser: addUser,
    updateUser, updateUser,
    deleteUser: deleteUser,
    deleteAd: deleteAd,
    deleteCategory: deleteCategory
  }
});

export default new GraphQLSchema({query, mutation});