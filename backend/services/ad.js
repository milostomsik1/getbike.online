import faker from 'faker';
import { AdSchema } from '../App/Ad/ad.mongoose.model';
import { UserSchema } from '../App/User/user.mongoose.model';

// -- dependency as parameter
export default (users) => {
  return {
    model: AdSchema,
    references: [{name: 'seller', ref: 'ads', model: UserSchema}],
    amount: 5,
    fields: {
      seller: users[Math.floor(Math.random() * users.length)]._id,
      title: faker.lorem.sentence(),
      views: Math.ceil(Math.random() * 1000),
      availability: Boolean(Math.round(Math.random() * 0.67)) ? 'available' : Boolean(Math.round(Math.random())) ? 'sold' : 'reserved',
      price: {
        amount: Math.ceil(Math.random() * 2500),
        currency: 'EUR'
      },
      status: 'second hand',
      // category: faker.lorem.word(),
      // subcategory: faker.lorem.word(),
      description: faker.lorem.words(25),
      specifications: {
        groupset: 'Ultegra 6800'
      },
      thumbnail: faker.image.imageUrl(),
      images: [faker.image.imageUrl()],
      tradable: Boolean(Math.round(Math.random())) ? true : false,
      tradeMethods: ['In Person', 'Delivery'],
      type: {
        name: 'regular',
        expires: null
      },
      rated: false,
      created: Date.now(),
      refreshed: Date.now(),
      updated: Date.now()
    }
  }
}