import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

import { CategoryType } from '../Category/category.graphql.model'
import { CategorySchema } from '../Category/category.mongoose.model'


// -- Subcategory Type
export const SubcategoryType = new GraphQLObjectType({
  name: 'Subcategory',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parentValue, args) {
        return CategorySchema.findById(parentValue.category);
      }
    },
  })
});
