import mongoose from 'mongoose';
import faker from 'faker';

import { UserSchema } from '../App/User/user.mongoose.model';
import { AdSchema } from '../App/Ad/ad.mongoose.model';


async function getRandomUser() {
  const users = await UserSchema.find();
  return users[Math.floor(Math.random() * users.length)]._id;
}


//------------------------------
// SEED LIST
//------------------------------


const seedList = [
  seed(seedable(UserSchema, 3, () => {
    return {
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(9),
      location: {
        country: faker.address.country(),
        city: faker.address.city()
      }
    }
  })),
  seed(seedable(AdSchema, 3, () => {
    return {
      seller: getRandomUser(),
      title: faker.lorem.sentence(),
      views: Math.ceil(Math.random() * 1000),
      availability: Boolean(Math.round(Math.random() * 0.67)) ? 'available' : Boolean(Math.round(Math.random())) ? 'sold' : 'reserved',
      price: {
        amount: Math.ceil(Math.random() * 2500),
        currency: 'EUR'
      },
      status: 'second hand',
      // category: faker.lorem.word(),
      // subcategory: faker.lorem.word(),
      description: faker.lorem.words(25),
      specifications: {
        groupset: 'Ultegra 6800'
      },
      thumbnail: faker.image.imageUrl(),
      images: [faker.image.imageUrl()],
      tradable: Boolean(Math.round(Math.random())) ? true : false,
      tradeMethods: ['In Person', 'Delivery'],
      type: {
        name: 'regular',
        expires: null
      },
      rated: false,
      created: Date.now(),
      refreshed: Date.now(),
      updated: Date.now()
    }
  }))
];


//------------------------------
// CREATE SEEDABLE OBJECT
//------------------------------
function seedable(model, amount, payload) {
  return {
    name: model.modelName,
    model: model,
    payload: (new Array(amount)).fill(null).map(item => payload())
  };
}


//------------------------------
// SEED FUNCTION
//------------------------------
function seed(item) {
  return async () => {
    const SEED_START = Date.now();
    console.log(`-> Seeding ${item.name}`);
    try {
      item.model.collection.drop();
      await item.model.create(item.payload);
      console.log(`Completed in ${(Date.now() - SEED_START) / 1000}s, ${item.payload.length} ${item.name.toLowerCase()}s seeded.`);
    } catch (err) {
      console.log(err);
      // reject(err);
    }
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}


//------------------------------
// SEEDER EXECUTION
//------------------------------
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
.then(() => {
  console.log('\n//--------------------------');
  console.log('// EXECUTING DATABASE SEEDER');
  console.log('//--------------------------\n');

  // -- SEQUENTIALLY EXECUTE SEED LIST
  (async function() {
    for (const seed of seedList) {
      await seed();
    }
    mongoose.disconnect();
  })();
})
.catch(err => console.log(`\n${err.message}\n`));
