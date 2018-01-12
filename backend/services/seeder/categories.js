import faker from 'faker';
import mongoose from 'mongoose';
import { CategorySchema } from '../../App/Category/category.mongoose.model';
import {
    writeToDB,
    generateSeedable
} from './helpers';


// -- categories factory
const category = () => {
  return {
    name: faker.commerce.product(),
  }
}

// -- generate categories
const categories = generateSeedable(category, 10);


// -- notificaton seeder
const seed = (model, categories) => {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
  .then(connected => writeToDB(model, categories))
  .then(() => mongoose.disconnect())
  .catch(err => console.log(err));
}


export default function() {
  return new Promise(resolve => {
    setTimeout(() => {
      seed(CategorySchema, categories);
      resolve(true);
    }, 500);
  });
}