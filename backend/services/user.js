import faker from 'faker';
import { UserSchema } from '../App/User/user.mongoose.model';

export default () => {
  return {
    model: UserSchema,
    references: [],
    amount: 5,
    fields: {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(9),
      location: {
        country: faker.address.country(),
        city: faker.address.city()
      }
    }
  }
}