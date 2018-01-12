import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';
import { NotificationSchema } from '../../App/Notification/notification.mongoose.model';
import {
    sort,
    byKeyAscending,
    randomItem,
    transformDocuments,
    getUsers,
    writeToDB,
    generateSeedable
} from './helpers';


// -- notifications factory
const notification = () => {
  return {
    // user: added in code afterwards
    title: faker.commerce.product(),
    content: faker.lorem.words(20),
    created: Date.now()
  }
}

// -- generate notifications
const notifications = generateSeedable(notification, 1500);

const addUserToNotifications = (notifications, user) => {
  return notifications.map(notification => {
    return {...notification, user: user()};
  });
}

// REFACTOR THIS
const insertCreatedNotificationsIntoUsers = (docs) => {
  return new Promise((resolve, reject) => {
    console.log('** Inserting created notifications into users...')
    docs = sort(docs, 'user', byKeyAscending);
    const transformedDocuments = transformDocuments(docs, 'user', '_id');
    const toBeUpdated = [];
    transformedDocuments.forEach(doc => {
      const userID = Object.keys(doc)[0];
      toBeUpdated.push(UserSchema.findByIdAndUpdate(userID, {notifications: doc[userID]}));
      Promise.all(toBeUpdated).then(() => resolve(true));
    });
  });
}

// -- notificaton seeder
const seed = (model, notifications) => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(connected => getUsers())
    .then(users => {
      const randomUser = () => randomItem(users)._id;
      notifications = addUserToNotifications(notifications, randomUser);
      return writeToDB(model, notifications);
    })
    .then(createdNotifications => insertCreatedNotificationsIntoUsers(createdNotifications))
    .then(() => mongoose.disconnect().then(() => resolve(true)))
    .catch(err => reject(err));
  });
}

export default seed.bind({}, NotificationSchema, notifications);