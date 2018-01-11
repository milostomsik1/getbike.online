import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';
import { AdSchema } from '../../App/Ad/ad.mongoose.model';
import { sort, byKeyAscending, randomItem, transformDocuments } from './helpers';


// -- user factory
const ad = () => {
  return {
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
const ads = generateAds(ad, 20);

const getUsers = () => {
  return new Promise((resolve, reject) => {
    UserSchema.find()
    .then(users => resolve(users))
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
    return {...ad, seller: seller()}
  })
}

// REFACTOR THIS
const insertCreatedAdsIntoUsers = (docs) => {
  return new Promise((resolve, reject) => {
    docs = sort(docs, 'seller', byKeyAscending);
    const transformedDocuments = transformDocuments(docs, 'seller', '_id');
    const toBeUpdated = [];
    transformedDocuments.forEach(doc => {
      const userID = Object.keys(doc)[0];
      toBeUpdated.push(UserSchema.findByIdAndUpdate(userID, {ads: doc[userID]}));
      Promise.all(toBeUpdated).then(() => resolve(true));
    });
  });
}

// -- ad seeder
const seed = (model, ads) => {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
  .then(connected => getUsers())
  .then(users => {
    const randomUser = () => randomItem(users)._id
    ads = addSellerToAds(ads, randomUser);
    return writeToDB(model, ads);
  })
  .then(createdAds => insertCreatedAdsIntoUsers(createdAds))
  .then(() => mongoose.disconnect())
  .catch(err => console.log(err));
}

// -- execute ad seeding
seed(AdSchema, ads);
