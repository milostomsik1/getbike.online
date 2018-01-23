import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';
import { AdSchema } from '../../App/Ad/ad.mongoose.model';
import {
  sort,
  byKeyAscending,
  randomItem,
  transformDocuments,
  getCategories,
  getSubcategories,
  getUsers,
  writeToDB
} from './helpers';


// -- ad factory
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
    // category: later added in code
    // subcategory: later added in code
    description: faker.lorem.words(25),
    specifications: 'Dura Ace 9100',
    thumbnail: faker.image.imageUrl(),
    images: [faker.image.imageUrl()],
    tradable: Boolean(Math.round(Math.random())) ? true : false,
    tradeMethods: ['In Person', 'Delivery'],
    type: {
      name: 'Regular',
      expires: null
    },
    isRated: false,
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

const addUserToAds = (ads, user) => {
  return ads.map(ad => {
    return {...ad, user: user()}
  });
}

const addCategoryToAds = (ads, category) => {
  return ads.map(ad => {
    return {
      ...ad, category: category()};
  });
}

const addSubcategoryToAds = (ads, subcategory) => {
  return ads.map(ad => {
    return {
      ...ad, subcategory: subcategory()};
  });
}

// REFACTOR THIS
const insertCreatedAdsIntoUsers = (docs) => {
  return new Promise((resolve, reject) => {
    console.log('** Inserting created ads into users...')
    docs = sort(docs, 'user', byKeyAscending);
    const transformedDocuments = transformDocuments(docs, 'user', '_id');
    const toBeUpdated = [];
    transformedDocuments.forEach(doc => {
      const userID = Object.keys(doc)[0];
      toBeUpdated.push(UserSchema.findByIdAndUpdate(userID, {ads: doc[userID]}));
      toBeUpdated.push(UserSchema.findByIdAndUpdate(userID, {favorites: doc[userID]}));
    });
    Promise.all(toBeUpdated).then(() => resolve(true));
  });
}


// -- ad seeder
const seed = (model, ads) => {
  return new Promise((resolve, reject) => {
    let randomUser;
    let randomCategory;
    let randomSubcategory;

    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(connected => getUsers())
    .then(users => {
      randomUser = () => randomItem(users)._id;
      return getCategories();
    })
    .then(categories => {
      randomCategory = () => randomItem(categories)._id;
      return getSubcategories();
    })
    .then(subcategories => {
      randomSubcategory = () => randomItem(subcategories)._id;
      ads = addUserToAds(ads, randomUser);
      ads = addCategoryToAds(ads, randomCategory);
      ads = addSubcategoryToAds(ads, randomSubcategory);
      return writeToDB(model, ads);
    })
    .then(createdAds => insertCreatedAdsIntoUsers(createdAds))
    .then(() => mongoose.disconnect().then(() => resolve(true)))
    .catch(err => reject(err));
  });
}


export default seed.bind({}, AdSchema, ads);
