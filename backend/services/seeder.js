import mongoose from 'mongoose';
import faker from 'faker';

// const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
import { UserSchema } from '../User/user.mongoose.model';

//------------------------------
// SEED LIST
//------------------------------
const seedList = [
  createSeedable(UserSchema, 200, () => {
    return {
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(9),
      location: {
        country: faker.address.country(),
        city: faker.address.city()
      }
    };
  }),
  createSeedable(Product, 5000, () => {
    return { name: faker.name.firstName() };
  })
];


//------------------------------
// CREATE SEEDABLE OBJECT
//------------------------------
function createSeedable(model, amount, payload) {
  return {
    name: model.modelName,
    model: model,
    payload: (new Array(amount)).fill(null).map(item => payload())
  };
}


//------------------------------
// SEED FUNCTION
//------------------------------
async function seed(seedList) {
  for (let item of seedList) {
    const SEED_START = Date.now();
    console.log(`-> Seeding ${item.name}`)

    try {
      item.model.collection.drop();
    } catch (err) {
      console.log(err);
    } finally {
      await item.model.create(item.payload)
    }

    console.log(`Completed in ${(Date.now() - SEED_START) / 1000}s, ${item.payload.length} ${item.name.toLowerCase()}s seeded.\n`);
  }
  return new Promise(resolve => resolve(true));
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
  seed(seedList).then(() => mongoose.disconnect());
})
.catch(err => console.log(`\n${err.message}\n`));
