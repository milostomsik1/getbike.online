import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import { CategoryType } from './category.graphql.model'
import { CategorySchema } from './category.mongoose.model'


// -- Get Category By ID
export const category = {
  type: CategoryType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return CategorySchema.findById(args.id);
  }
}

// -- Get All Categories
export const categories = {
  type: new GraphQLList(CategoryType),
  resolve() {
    return CategorySchema.find();
  }
}

// -- Delete A User
export const deleteCategory = {
  type: CategoryType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return CategorySchema.findByIdAndRemove(args.id);
  }
}