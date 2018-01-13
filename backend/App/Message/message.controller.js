import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import { MessageType } from './message.graphql.model'
import { MessageSchema } from './message.mongoose.model'


// -- Get Message By ID
export const message = {
  type: MessageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return MessageSchema.findById(args.id);
  }
}

// -- Get All Messages
export const messages = {
  type: new GraphQLList(MessageType),
  resolve() {
    return MessageSchema.find();
  }
}

// -- Delete A Message
export const deleteMessage = {
  type: MessageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return MessageSchema.findByIdAndRemove(args.id);
  }
}