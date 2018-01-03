import User from './user';
import Ad from './ad';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise

function generateSeedable(factory) {
  return {
    model: factory().model,
    documents: (new Array(factory().amount)).fill(null).map(item => factory().fields)
  }
}

function seed(factory) {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(() => {
      // resolve dependency references

      const seedable = generateSeedable(factory);

      console.log(`-> Seeding ${seedable.model.modelName}`);

      seedable.model.collection.drop();
      seedable.model.create(seedable.documents)
      .then((doc) => {
        console.log(`Successfully seeded ${seedable.documents.length} ${seedable.model.modelName}s\n`);
        resolve(doc);
        mongoose.disconnect();
      })
      .catch(err => {
        console.log(err);
        reject(err);
        mongoose.disconnect();
      });
    })
    .catch(err => {
      console.log(`\n${err.message}\n`);
      reject(err);
    });
  });

}

seed(User, 2)
.then(users => seed(() => Ad(users), 3))