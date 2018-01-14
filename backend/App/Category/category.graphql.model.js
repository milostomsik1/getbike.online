import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';

import { SubcategoryType } from '../Subcategory/subcategory.graphql.model'
import { SubcategorySchema } from '../Subcategory/subcategory.mongoose.model'


// -- Category Type
export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    subcategories: {
      type: new GraphQLList(SubcategoryType),
      async resolve(parentValue, args) {
        const subcategories = [];
        for (const subcategory of parentValue.subcategories) {
          subcategories.push(await SubcategorySchema.findById(subcategory));
        }
        return subcategories;
      }
    },
  })
});
