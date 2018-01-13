import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import { ThreadType } from './thread.graphql.model'
import { ThreadSchema } from './thread.mongoose.model'


// -- Get Thread By ID
export const thread = {
  type: ThreadType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return ThreadSchema.findById(args.id);
  }
}

// -- Get All Threads
export const threads = {
  type: new GraphQLList(ThreadType),
  resolve() {
    return ThreadSchema.find();
  }
}

// -- Delete A Thread
export const deleteThread = {
  type: ThreadType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return ThreadSchema.findByIdAndRemove(args.id);
  }
}