import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import { SubcategoryType } from './subcategory.graphql.model'
import { SubcategorySchema } from './subcategory.mongoose.model'


// -- Get Subcategory By ID
export const subcategory = {
  type: SubcategoryType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return SubcategorySchema.findById(args.id);
  }
}

// -- Get All Subcategories
export const subcategories = {
  type: new GraphQLList(SubcategoryType),
  resolve() {
    return SubcategorySchema.find();
  }
}

// -- Delete A Subcategory
export const deleteSubcategory = {
  type: SubcategoryType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return SubcategorySchema.findByIdAndRemove(args.id);
  }
}