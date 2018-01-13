import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';


// -- Category Type
export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    subcategories: { type: new GraphQLList(GraphQLID) },
  }
});
