import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';
import {
  writeToDB
} from './helpers';

// -- user factory
const user = () => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(9),
    location: {
      country: faker.address.country(),
      city: faker.address.city()
    }
  }
}

// -- users generator
const generateUsers = (user, amount) => {
  return (new Array(amount)).fill(null).map(element => user());
}

// -- generate users
const users = generateUsers(user, 50);

// -- user seeder
const seed = (model, users) => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(connected => writeToDB(model, users))
    .then(seededUsers => mongoose.disconnect().then(() => resolve(true)))
    .catch(err => reject(err));
  });
}


export default seed.bind({}, UserSchema, users);