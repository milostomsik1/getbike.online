import mongoose from 'mongoose';
import seed from './seeder-function';

const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
.then(() => {
  (async function() {
    try {
      await seed('Users', User, {name: 'Name'}, 1000)
      await seed('Products', Product, {name: 'Product'}, 7500);
      mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  })();
})
.catch(err => {
  console.log(`\n${err.message}\n`);
});

