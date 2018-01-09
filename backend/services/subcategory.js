import faker from 'faker';
import { CategorySchema } from '../App/Category/category.mongoose.model';
import { SubcategorySchema } from '../App/Subcategory/subcategory.mongoose.model';

export default (categories) => {
  return {
    model: SubcategorySchema,
    references: [{name: 'category', ref: 'subcategories', model: CategorySchema}],
    amount: 50,
    fields: {
      name: faker.commerce.product(),
      category: categories[Math.floor(Math.random() * categories.length)]._id
    }
  }
}