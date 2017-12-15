// import mongoose from 'mongoose';
// import faker from 'faker';

// const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
// const Product = mongoose.model('Product', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));


// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
// .then(connected => {
//   (async function() {
//     for (let item of seedList) {
//       console.log(`Seeding ${item.name}`)
//       // await item.model.collection.drop();
//       await item.model.create(createSeedableModel(item.payload, item.amount));
//       console.log(createSeedableModel(item.payload, item.amount));
//     }
//     mongoose.disconnect();
//   })()
// })
// .catch(err => console.log(`\n${err.message}\n`));


// const seedList = [
//   {
//     name: 'Users',
//     model: User,
//     payload: {
//       name: faker.name.firstName,
//       name1: faker.name.firstName
//     },
//     amount: 3
//   }
// ];

// function execute(object) {
//   for (const key in object) {
//     if (typeof object[key] === 'function') {
//       object[key] = object[key]();
//     }
//   }
//   return object;
// }

// function createSeedableModel(payload, amount) {
//   return new Array(amount).fill(null).map(item => execute(payload));
// }

import mongoose from 'mongoose';
import faker from 'faker';

const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
.then(() => {
  seed(seedList).then(() => mongoose.disconnect());
})
.catch(err => console.log(`\n${err.message}\n`));


async function seed(seedList) {
  for (let item of seedList) {
    const SEED_START = Date.now();
    console.log(`Seeding ${item.name}`)

    item.model.collection.drop();
    await item.model.create(item.payload)

    console.log(`Completed in ${(Date.now() - SEED_START) / 1000}s, ${item.payload.length} ${item.name.toLowerCase()}s seeded.\n`);
  }
  return new Promise(resolve => resolve(true));
}

function createSeedable(model, amount, payload) {
  return {
    name: model.modelName,
    model: model,
    payload: (new Array(amount)).fill(null).map(item => payload())
  };
}

const seedList = [
  createSeedable(User, 200, () => {
    return { name: faker.name.firstName() };
  }),
  createSeedable(Product, 5000, () => {
    return { name: faker.name.firstName() };
  })
];