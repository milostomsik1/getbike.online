import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql';


// -- Rating Type
export const RatingType = new GraphQLObjectType({
  name: 'Rating',
  fields: {
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    ad: { type: GraphQLID },
    type: { type: GraphQLString },
    description: { type: GraphQLInt },
    communication: { type: GraphQLInt },
    trade: { type: GraphQLInt },
    comment: { type: GraphQLString },
    created: { type: GraphQLString }
  }
});
