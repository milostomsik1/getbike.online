import mongoose from 'mongoose';
import seed from './seed-function';
import seedList from './seed-list';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
.then(connected => {
  (async function() {
    for (let item of seedList) {
      await seed(item);
    }
    mongoose.disconnect();
  })()
})
.catch(err => console.log(`\n${err.message}\n`));

