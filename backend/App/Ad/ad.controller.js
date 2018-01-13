import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import { AdType } from './ad.graphql.model'
import { AdSchema } from './ad.mongoose.model'


// -- Get Ad By ID
export const ad = {
  type: AdType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return AdSchema.findById(args.id);
  }
}

// -- Get All Ads
export const ads = {
  type: new GraphQLList(AdType),
  resolve() {
    return AdSchema.find();
  }
}

// -- Delete A User
export const deleteAd = {
  type: AdType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return AdSchema.findByIdAndRemove(args.id);
  }
}