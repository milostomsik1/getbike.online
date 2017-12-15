import mongoose from 'mongoose';
import faker from 'faker';

const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));

export default [
  {
    name: 'Users',
    model: User,
    payload: {name: faker.name.firstName() },
    amount: 100
  },
  {
    name: 'Products',
    model: Product,
    payload: {name: 'Product'},
    amount: 1000
  }
];