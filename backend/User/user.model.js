import mongoose from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql/type';


// -- Mongo Schema
export const UserSchema = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 32
  },
  // ads: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Ad'
  //   default: []
  // },
  // canCreateAds: {
  //   type: Boolean,
  //   default: true
  // },
  // favorites: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Ad'
  //   default: []
  // },
  // ratings: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Rating'
  //   default: []
  // },
  // messages: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Thread'
  //   default: []
  // },
  // notifications: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Notification'
  //   default: []
  // },
  location: {
    type: Object,
    required: true,
  },
  contact: {
    type: Object
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
},
{ versionKey: false }));


// -- GraphQL Location Output Type
const LocationOutputType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    country: { type: GraphQLString },
    city: { type: GraphQLString }
  }
});

// -- GraphQL Type
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    location: { type: LocationOutputType },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
