import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList
} from 'graphql';


// -- Location Input Type
export const LocationInputType = new GraphQLInputObjectType({
  name: 'InputLocation',
  fields: {
    country: { type: GraphQLString },
    city: { type: GraphQLString }
  }
})

// -- Location Output Type
export const LocationOutputType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    country: { type: GraphQLString },
    city: { type: GraphQLString }
  }
});

// -- Contact Input Type
export const ContactInputType = new GraphQLInputObjectType({
  name: 'InputContact',
  fields: {
    phone: { type: GraphQLString }
  }
})

// -- Contact Output Type
export const ContactOutputType = new GraphQLObjectType({
  name: 'Contact',
  fields: {
    phone: { type: GraphQLString },
  }
});

// -- User Type
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    ads: { type: GraphQLID },
    canCreateAds: { type: GraphQLBoolean },
    favorites: { type: new GraphQLList(GraphQLID) },
    ratings: { type: new GraphQLList(GraphQLID) },
    messages: { type: new GraphQLList(GraphQLID) },
    notifications: { type: new GraphQLList(GraphQLID) },
    location: { type: LocationOutputType },
    contact: { type: ContactOutputType },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
