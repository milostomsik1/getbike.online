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
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(connected => writeToDB(model, categories))
    .then(() => mongoose.disconnect().then(() => resolve(true)))
    .catch(err => reject(err));
  });
}

export default seed.bind({}, CategorySchema, categories);