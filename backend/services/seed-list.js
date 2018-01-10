// -- Import Seeder
import seed from './seeder';
// -- Import Factories
import User from './user';
import Ad from './ad';
import Category from './category';
import Subcategory from './subcategory';
import Rating from './rating';
import Notification from './notification';
import Thread from './thread';
import Message from './message';

const dependencies = {};
// -- Data Seeding
seed(() => User(null)).then(users => {
  dependencies['users'] = users;
  return seed(() => Category(null));
})
.then(categories => {
  dependencies['categories'] = categories;
  return seed(() => Subcategory(dependencies.categories));
})
.then(subcategories => {
  dependencies['subcategories'] = subcategories;
  return seed(() => Ad(dependencies.users,
                       dependencies.categories,
                       dependencies.subcategories));
})
.then(ads => {
  dependencies['ads'] = ads;
  return seed(() => Rating(dependencies.users,
                           dependencies.ads));
})
.then(ratings => {
  dependencies['ratings'] = ratings;
  return seed(() => Notification(dependencies.users));
})
.then(notifications => {
  dependencies['notifications'] = notifications;
  return seed(() => Message(dependencies.users));
})
.then(messages => {
  dependencies['messages'] = messages;
  return seed(() => Thread(dependencies.messages,
                           dependencies.ads));
})
.then(threads => {
  dependencies['threads'] = threads;
})
.catch(err => console.log(err));

