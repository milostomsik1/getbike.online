import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';

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
const users = generateUsers(user, 10);

// -- write to DB
const writeToDB = (model, users) => {
  return new Promise((resolve, reject) => {
    const SEED_START = Date.now();
    console.log(`-> Seeding ${model.modelName}`);
    model.collection.drop()
    .then(dropped => model.create(users))
    .then(userDocs => {
      const SEED_END = Date.now();
      console.log(`Successfully seeded ${userDocs.length} ${model.modelName} items in ${(SEED_END - SEED_START) / 1000}s.\n`);
      resolve(userDocs);
    })
    .catch(err => reject(err))
  })
}

// -- user seeder
const seed = (model, users) => {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
  .then(connected => writeToDB(model, users))
  .then(seededUsers => mongoose.disconnect())
  .catch(err => console.log(err));
}

// -- execute user seeding
seed(UserSchema, users);