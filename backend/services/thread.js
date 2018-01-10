import faker from 'faker';
import { ThreadSchema } from '../App/Thread/thread.mongoose.model';
import { UserSchema } from '../App/User/user.mongoose.model';

export default (messages, ads) => {
  // find messages that have same sender + recipient pairs and group them
  // set amount to amount of unique pairs

  // meh

  return {
    model: ThreadSchema,
    references: [{name: 'messages', ref: 'messages', model: UserSchema}], // incorrect
    amount: 75, // calculate threads according to amount of messages
    fields: {
      // participants: 
      ad: ads[Math.floor(Math.random() * ads.length)]._id,
    }
  }
}