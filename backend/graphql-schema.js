import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import UserModel from './User/user.model'

const users = [
  {
    id: '1',
    name: 'Milos',
    email: 'milostomsik1@gmail.com'
  },
  {
    id: '2',
    name: 'Milos2',
    email: 'milostomsik2@gmail.com'
  }
];


// -- Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserModel,
      args: {
        id: { type: GraphQLString }
      },
      resolve (value, args) {
        for (const user of users) {
          if (user.id === args.id) {
            return user;
          }
        }
      }
    },
    users: {
      type: new GraphQLList(UserModel),
      resolve (value, args) {
        return users;
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});