import faker from 'faker';
import { ThreadSchema } from '../App/Thread/thread.mongoose.model';
import { UserSchema } from '../App/User/user.mongoose.model';

export default (messages, ads) => {
  const participants = messages.map(message => {
    return [message.sender, message.recipient];
  });

  return {
    model: ThreadSchema,
    references: [
      {name: 'participants', ref: 'messages', model: UserSchema},
      {name: 'participants', ref: 'messages', model: UserSchema},
    ],
    amount: 75,
    fields: {
      participants: participants[Math.floor(Math.random() * participants.length)],
      ad: ads[Math.floor(Math.random() * ads.length)]._id,
    }
  }
}