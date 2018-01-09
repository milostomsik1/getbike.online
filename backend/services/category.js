import faker from 'faker';
import { CategorySchema } from '../App/Category/category.mongoose.model';

export default () => {
  return {
    model: CategorySchema,
    references: [],
    amount: 10,
    fields: {
      name: faker.commerce.product(),
    }
  }
}