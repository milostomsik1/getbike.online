import faker from 'faker';
import { RatingSchema } from '../App/Rating/rating.mongoose.model';
import { UserSchema } from '../App/User/user.mongoose.model';

// -- dependency as parameter
export default (users, ads) => {
  return {
    model: RatingSchema,
    references: [
      {name: 'user', ref: 'ratings', model: UserSchema},
    ],
    amount: 100,
    fields: {
      user: users[Math.floor(Math.random() * users.length)]._id,
      ad: ads[Math.floor(Math.random() * ads.length)]._id,
      type: 'seller',
      description: Math.ceil(Math.random() * 5),
      communication: Math.ceil(Math.random() * 5),
      trade: Math.ceil(Math.random() * 5),
      comment: faker.lorem.words(20),
      created: Date.now()
    }
  }
}