import faker from 'faker';
import mongoose from 'mongoose';
import { ThreadSchema } from '../../App/Thread/thread.mongoose.model';
import { MessageSchema } from '../../App/Message/message.mongoose.model';
import {
    sort,
    byKeyAscending,
    randomItem,
    transformDocuments,
    getUsers,
    writeToDB,
    generateSeedable
} from './helpers';


// -- message factory
const message = () => {
  return {
    // sender: twoRandomUsers[0],
    // recipient: twoRandomUsers[1],
    content: faker.lorem.words(25),
    created: Date.now()
  }
}

// -- generate messages
const messages = generateSeedable(message, 5000);

// -- inserts sender and recipient into messages
const addSenderRecipientToMessages = (messages, generateTwoUniqueUsers) => {
  return messages.map(message => {
    const users = generateTwoUniqueUsers();
    return {...message, sender: users[0], recipient: users[1]};
  });
}

// generate array of 2 unique users
const generateTwoUniqueUsers = (users) => {
  const randomUser = () => randomItem(users)._id;
  const randomUser1 = randomUser();
  let randomUser2 = randomUser();
  while (randomUser1 === randomUser2) {
    randomUser2 = randomUser();
  }
  return [randomUser1, randomUser2];
}


// -- messages seeder
const seed = (model, messages) => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(connected => getUsers())
    .then(users => {
      const twoUniqueUsers = () => generateTwoUniqueUsers(users);
      messages = addSenderRecipientToMessages(messages, twoUniqueUsers);
      return writeToDB(model, messages);
    })
    .then(() => mongoose.disconnect().then(() => resolve(true)))
    .catch(err => reject(err));
  });
}

export default seed.bind({}, MessageSchema, messages);