import faker from 'faker';
import { NotificationSchema } from '../App/Notification/notification.mongoose.model';
import { UserSchema } from '../App/User/user.mongoose.model';

// -- dependency as parameter
export default (users) => {
  return {
    model: NotificationSchema,
    references: [{name: 'user', ref: 'notifications', model: UserSchema}],
    amount: 200,
    fields: {
      user: users[Math.floor(Math.random() * users.length)]._id,
      title: faker.commerce.product(),
      content: faker.lorem.words(20),
      created: Date.now()
    }
  }
}