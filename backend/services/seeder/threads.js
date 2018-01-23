import faker from 'faker';
import mongoose from 'mongoose';
import { UserSchema } from '../../App/User/user.mongoose.model';
import { ThreadSchema } from '../../App/Thread/thread.mongoose.model';
import {
    sort,
    byKeyAscending,
    randomItem,
    isUnique,
    transformDocuments,
    getMessages,
    writeToDB,
    getAds
} from './helpers';

const uniqueParticipantPairs = (messages) => {
  const participants = messages.map(message =>
    JSON.stringify([message.sender, message.recipient].join(',')));
  const uniques = participants
  .reduce((sum, current) => {
    if (!(sum.includes(current) || sum.includes(current.split(',').reverse().join(',')))) {
      sum.push(current);
    }
    return sum;
  }, [])
  .map(participant => JSON.parse(participant).split(','));
  return uniques;
}

const transformMessages = (messages, uniqueParticipantPairs) => {
  let transformedMsgs = uniqueParticipantPairs.map(y => { return {participants: y, messages: []} });
  messages.forEach(message => {
    transformedMsgs.forEach((msg, i) => {
      if ((message.sender == msg.participants[0] && message.recipient == msg.participants[1])
      || (message.sender == msg.participants[1] && message.recipient == msg.participants[0])) {
        transformedMsgs[i].messages.push(message._id);
      }
    });
  });
  return transformedMsgs;
}

const insertCreatedThreadsIntoUsers = (createdThreads) => {
  return new Promise((resolve, reject) => {
    console.log('** Inserting created threads into users...')
    let transformedThreads = createdThreads.map(thread => {
      return {
        id: thread._id,
        user: thread.participants[0]
      };
    }).concat(createdThreads.map(thread => {
      return {
        id: thread._id,
        user: thread.participants[1]
      };
    }));
    transformedThreads = transformDocuments(transformedThreads, 'user', 'id');
    const toBeUpdated = [];
    transformedThreads.forEach(tThread => {
      const user = Object.keys(tThread)[0];
      const threads = tThread[user];
      toBeUpdated.push(UserSchema.findByIdAndUpdate(user, {threads}));
    });
    Promise.all(toBeUpdated).then(() => resolve(true));
  });
}

let threads;

// -- thread seeder
const seed = (model, threads) => {
  return new Promise((resolve, reject) => {
    let randomAd;
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true })
    .then(connected => getAds())
    .then(ads => {
      randomAd = () => randomItem(ads).id;
      return getMessages();
    })
    .then(messages => {
      const uniqueParticipants = uniqueParticipantPairs(messages);
      const transformedMessages = transformMessages(messages, uniqueParticipants);
      threads = transformedMessages.map(msg => {
        return {
          ...msg,
          ad: randomAd(),
          created: Date.now(),
          updated: Date.now()
        }
      });
      return writeToDB(model, threads);
    })
    .then(createdThreads => insertCreatedThreadsIntoUsers(createdThreads))
    .then(() => mongoose.disconnect().then(() => resolve(true)))
    .catch(err => reject(err));
  });
}


export default seed.bind({}, ThreadSchema, threads);