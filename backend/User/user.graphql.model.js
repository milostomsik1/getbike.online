import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql/type';


// -- GraphQL Location Input Type
export const LocationInputType = new GraphQLInputObjectType({
  name: 'InputLocation',
  fields: {
    country: { type: GraphQLString },
    city: { type: GraphQLString }
  }
})

// -- GraphQL Location Output Type
export const LocationOutputType = new GraphQLObjectType({
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
    canCreateAds: { type: GraphQLBoolean },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
