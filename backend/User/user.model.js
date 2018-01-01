import mongoose from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';


// -- Mongo Schema
export const UserSchema = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  }
},
{ versionKey: false }));


// -- GraphQL Type
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});