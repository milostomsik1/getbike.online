import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';


// -- Subcategory Type
export const SubcategoryType = new GraphQLObjectType({
  name: 'Subcategory',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLID },
  }
});
