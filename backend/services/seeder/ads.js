import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';
import { AdSchema } from '../../App/Ad/ad.mongoose.model';

// -- array random prototype
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
}

// -- user factory
const ad = () => {
  return {
    // seller: users[Math.floor(Math.random() * users.length)]._id,
    title: faker.lorem.words(3),
    views: Math.ceil(Math.random() * 1000),
    availability: Boolean(Math.round(Math.random() * 0.67)) ? 'Available' : Boolean(Math.round(Math.random())) ? 'Sold' : 'Reserved',
    price: {
      amount: Math.ceil(Math.random() * 2500),
      currency: 'EUR'
    },
    status: 'Second Hand',
    // category: categories[Math.floor(Math.random() * categories.length)]._id,
    // subcategory: subcategories[Math.floor(Math.random() * subcategories.length)]._id,
    description: faker.lorem.words(25),
    specifications: {
      groupset: 'Ultegra 6800'
    },
    thumbnail: faker.image.imageUrl(),
    images: [faker.image.imageUrl()],
    tradable: Boolean(Math.round(Math.random())) ? true : false,
    tradeMethods: ['In Person', 'Delivery'],
    type: {
      name: 'Regular',
      expires: null
    },
    rated: false,
    created: Date.now(),
    refreshed: Date.now(),
    updated: Date.now()
  }
}

// -- ads generator
const generateAds = (ad, amount) => {
  return (new Array(amount)).fill(null).map(element => ad());
}

// -- generate ads
const ads = generateAds(ad, 1000);

const getRandomUser = () => {
  return new Promise((resolve, reject) => {
    UserSchema.find()
    .then(users => resolve(users.random()._id))
    .catch(err => resolve(err));
  });
}

// -- write to DB
const writeToDB = (model, ads) => {
  return new Promise((resolve, reject) => {
    const SEED_START = Date.now();
    console.log(`-> Seeding ${model.modelName}`);
    model.collection.drop()
    .then(dropped => model.create(ads))
    .then(adDocs => {
      // -- NOW UPDATE USERS WITH ADS THAT WERE CREATED
      const SEED_END = Date.now();
      console.log(`Successfully seeded ${adDocs.length} ${model.modelName} items in ${(SEED_END - SEED_START) / 1000}s.\n`);
      resolve(adDocs);
    })
    .catch(err => reject(err))
  })
}

const addSellerToAds = (ads, seller) => {
  return ads.map(ad => {
    return {...ad, seller}
  })
}

// -- ad seeder
const seed = (model, ads) => {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
  .then(connected => getRandomUser())
  .then(randomUser => {
    ads = addSellerToAds(ads, randomUser);
    return writeToDB(model, ads);
  })
  .then(seededAds => mongoose.disconnect())
  .catch(err => console.log(err));
}

// -- execute ad seeding
seed(AdSchema, ads);