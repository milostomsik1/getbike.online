import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true });
mongoose.Promise = global.Promise;

const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
const AMOUNT = 1000;
const PROMISES = [];
const SEED_START = Date.now();

console.log('[ Seeding Users ]');
User.collection.drop();
for (let i = 1; i <= AMOUNT; i++) {
  PROMISES.push(User.create({name: `Name ${i}`}))
}

Promise.all(PROMISES)
.then(res => {
  console.log(`Seed successfully completed in ${(Date.now() - SEED_START) / 1000}s, ${AMOUNT} users seeded.`);
  mongoose.disconnect();
})
.catch(err => console.log(err));
