import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';
import { RatingSchema } from '../../App/Rating/rating.mongoose.model';
import {
    sort,
    byKeyAscending,
    randomItem,
    transformDocuments,
    getUsers,
    getAds,
    writeToDB,
} from './helpers';


// -- ratings factory
const rating = () => {
  return {
    // user: added in code afterwards
    // ad: added in code afterwards
    type: 'seller',
    description: Math.ceil(Math.random() * 5),
    communication: Math.ceil(Math.random() * 5),
    trade: Math.ceil(Math.random() * 5),
    comment: faker.lorem.words(20),
    created: Date.now()
  }
}

// -- ratings generator
const generateRatings = (rating, amount) => {
  return (new Array(amount)).fill(null).map(element => rating());
}

// -- generate ratings
const ratings = generateRatings(rating, 100);


const addUserToRatings = (ratings, user) => {
  return ratings.map(rating => {
    return {...rating, user: user()}
  })
}

const addAdToRatings = (ratings, ad) => {
  return ratings.map(rating => {
    return {...rating, ad: ad()}
  })
}

// REFACTOR THIS
const insertCreatedRatingsIntoUsers = (docs) => {
  return new Promise((resolve, reject) => {
    docs = sort(docs, 'user', byKeyAscending);
    const transformedDocuments = transformDocuments(docs, 'user', '_id');
    const toBeUpdated = [];
    transformedDocuments.forEach(doc => {
      const userID = Object.keys(doc)[0];
      toBeUpdated.push(UserSchema.findByIdAndUpdate(userID, {ratings: doc[userID]}));
      Promise.all(toBeUpdated).then(() => resolve(true));
    });
  });
}

// -- rating seeder
const seed = (model, ratings) => {
  let randomUser;
  let randomAd;
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
  .then(connected => getUsers())
  .then(users => {
    randomUser = () => randomItem(users)._id;
    return getAds();
  })
  .then(ads => {
    randomAd = () => randomItem(ads)._id;
    ratings = addUserToRatings(ratings, randomUser);
    ratings = addAdToRatings(ratings, randomAd);
    return writeToDB(model, ratings);
  })
  .then(createdRatings => insertCreatedRatingsIntoUsers(createdRatings))
  .then(() => mongoose.disconnect())
  .catch(err => console.log(err));
}

// -- execute rating seeding
seed(RatingSchema, ratings);
