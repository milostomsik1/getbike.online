import { UserSchema } from '../../App/User/user.mongoose.model';
import { AdSchema } from '../../App/Ad/ad.mongoose.model';


export const byKeyAscending = function(key) {
  return function(arg1, arg2) {
    return arg1[key] === arg2[key] ? 0 : (arg1[key] > arg2[key] ? 1 : - 1);
  };
}

export const sort = function(arr, key, comparator) {
  return arr.sort(comparator(key));
}

export const randomItem = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const transformDocuments = (documents, KEY, VALUE) => {
  // key = 'seller' -> writes into users with that ID
  // value = '_id' -> IDs of given ads
  // { userId: [ adId, adId, adId] }

  function isUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function getUniqueKeys(arr) {
    return arr.map(item => item[KEY]).filter(isUnique);
  }

  const uniqueKeys = getUniqueKeys(documents);
  const transformedDocuments = uniqueKeys.map(key => {
    return {[key] : []};
  });

  documents.forEach(document => {
    transformedDocuments.forEach(transDoc => {
      if (transDoc[document[KEY]]) {
        transDoc[document[KEY]].push(document[VALUE]);
        // { userId: [ adId, adId, adId] }
      }
    });
  });

  return transformedDocuments;
}

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    UserSchema.find()
    .then(users => resolve(users))
    .catch(err => resolve(err));
  });
}

export const getAds = () => {
  return new Promise((resolve, reject) => {
    AdSchema.find()
    .then(ads => resolve(ads))
    .catch(err => resolve(err));
  });
}

export const writeToDB = (model, ads) => {
  return new Promise((resolve, reject) => {
    const SEED_START = Date.now();
    console.log(`-> Seeding ${model.modelName}`);
    model.collection.drop()
    .then(dropped => model.create(ads))
    .then(adDocs => {
      const SEED_END = Date.now();
      console.log(`Successfully seeded ${adDocs.length} ${model.modelName} items in ${(SEED_END - SEED_START) / 1000}s.\n`);
      resolve(adDocs);
    })
    .catch(err => reject(err))
  })
}