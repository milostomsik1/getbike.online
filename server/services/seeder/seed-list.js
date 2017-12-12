import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));

export default [
  {
    name: 'Users',
    model: User,
    payload: {name: 'Name'},
    amount: 100
  },
  {
    name: 'Products',
    model: Product,
    payload: {name: 'Product'},
    amount: 1000
  }
];
