import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import { RatingType } from './rating.graphql.model'
import { RatingSchema } from './rating.mongoose.model'


// -- Get Rating By ID
export const rating = {
  type: RatingType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return RatingSchema.findById(args.id);
  }
}

// -- Get All Ratings
export const ratings = {
  type: new GraphQLList(RatingType),
  resolve() {
    return RatingSchema.find();
  }
}

// -- Delete A Rating
export const deleteRating = {
  type: RatingType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return RatingSchema.findByIdAndRemove(args.id);
  }
}