import mongoose from 'mongoose';
import faker from 'faker';

const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
.then(connected => {
  (async function() {
    for (let item of seedList) {
      console.log(`Seeding ${item.name}`)
      // await item.model.collection.drop();
      await item.model.create(createSeedableModel(item.payload, item.amount));
      console.log(createSeedableModel(item.payload, item.amount));
    }
    mongoose.disconnect();
  })()
})
.catch(err => console.log(`\n${err.message}\n`));


const seedList = [
  {
    name: 'Users',
    model: User,
    payload: {
      name: faker.name.firstName,
      name1: faker.name.firstName
    },
    amount: 3
  }
];

function execute(object) {
  for (const key in object) {
    if (typeof object[key] === 'function') {
      object[key] = object[key]();
    }
  }
  return object;
}

function createSeedableModel(payload, amount) {
  return new Array(amount).fill(null).map(item => execute(payload));
}

// import faker from 'faker';

// let payload = function() { return {name: faker.name.firstName()} };
// let amount = 3;

// let arr = [];
// for (let i = 0; i < amount; i++) {
//   arr.push(payload());
// }

// console.log(arr);