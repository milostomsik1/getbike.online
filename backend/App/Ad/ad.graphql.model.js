import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';


// -- Price Input Type
export const PriceInputType = new GraphQLInputObjectType({
  name: 'InputPrice',
  fields: {
    amount: { type: GraphQLInt },
    currency: { type: GraphQLString }
  }
})

// -- Price Type
export const PriceType = new GraphQLObjectType({
  name: 'Price',
  fields: {
    amount: { type: GraphQLInt },
    currency: { type: GraphQLString }
  }
});

// -- Type Input Type
export const TypeInputType = new GraphQLInputObjectType({
  name: 'InputType',
  fields: {
    name: { type: GraphQLString },
    expires: { type: GraphQLString }
  }
})

// -- Type Type
export const TypeType = new GraphQLObjectType({
  name: 'Type',
  fields: {
    name: { type: GraphQLString },
    expires: { type: GraphQLString }
  }
});


// -- Ad Type
export const AdType = new GraphQLObjectType({
  name: 'Ad',
  fields: {
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    title: { type: GraphQLString },
    views: { type: GraphQLString },
    availability: { type: GraphQLString },
    price: { type: PriceType },
    status: { type: GraphQLString },
    category: { type: GraphQLID },
    subcategory: { type: GraphQLID },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    tradable: { type: GraphQLBoolean },
    tradeMethods: { type: new GraphQLList(GraphQLString) },
    type: { type: TypeType },
    isRated: { type: GraphQLBoolean },
    created: { type: GraphQLString },
    refreshed: { type: GraphQLString },
    updated: { type: GraphQLString },
  }
});
