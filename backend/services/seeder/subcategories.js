import faker from 'faker';
import mongoose from 'mongoose';
import { CategorySchema } from '../../App/Category/category.mongoose.model';
import { SubcategorySchema } from '../../App/Subcategory/subcategory.mongoose.model';
import {
    sort,
    byKeyAscending,
    randomItem,
    transformDocuments,
    writeToDB,
    getCategories,
    generateSeedable
} from './helpers';


// -- subcategory factory
const subcategory = () => {
  return {
    name: faker.commerce.product(),
    // category: added in code afterwards
  }
}

// -- generate subcategories
const subcategories = generateSeedable(subcategory, 75);

const addCategoryToSubcategories = (subcategories, category) => {
  return subcategories.map(subcategory => {
    return {...subcategory, category: category()};
  });
}

// REFACTOR THIS
const insertCreatedSubcategoriesIntoCategories = (docs) => {
  return new Promise((resolve, reject) => {
    console.log('** Inserting created subcategories into categories...')
    docs = sort(docs, 'category', byKeyAscending);
    const transformedDocuments = transformDocuments(docs, 'category', '_id');
    const toBeUpdated = [];
    transformedDocuments.forEach(doc => {
      const categoryID = Object.keys(doc)[0];
      toBeUpdated.push(CategorySchema.findByIdAndUpdate(categoryID, {subcategories: doc[categoryID]}));
      Promise.all(toBeUpdated).then(() => resolve(true));
    });
  });
}

// -- subcategory seeder
const seed = (model, subcategories) => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(connected => getCategories())
    .then(categories => {
      const randomCategory = () => randomItem(categories)._id;
      subcategories = addCategoryToSubcategories(subcategories, randomCategory);
      return writeToDB(model, subcategories);
    })
    .then(createdSubcategories => insertCreatedSubcategoriesIntoCategories(createdSubcategories))
    .then(() => mongoose.disconnect().then(() => resolve(true)))
    .catch(err => reject(err));
  })
}

export default seed.bind({}, SubcategorySchema, subcategories);
