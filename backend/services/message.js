import faker from 'faker';
import { ThreadSchema } from '../App/Thread/thread.mongoose.model';
import { MessageSchema } from '../App/Message/message.mongoose.model';

function getRandomUser(users) {
  return users[Math.floor(Math.random() * users.length)]._id;
}

function getTwoRandomUsers(users) {
  let twoUniqueUsers = [getRandomUser(users)];
  while (twoUniqueUsers.length < 2) {
    const randomUser = getRandomUser(users);
    if (!(twoUniqueUsers.includes(randomUser))) {
      twoUniqueUsers.push(randomUser);
    }
  }
  return twoUniqueUsers;
}

export default (users) => {
  const twoRandomUsers = getTwoRandomUsers(users);

  return {
    model: MessageSchema,
    references: [],
    amount: 500,
    fields: {
      sender: twoRandomUsers[0],
      recipient: twoRandomUsers[1],
      content: faker.lorem.words(25)
    }
  }
}