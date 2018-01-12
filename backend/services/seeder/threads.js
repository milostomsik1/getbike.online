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

const insertCreatedThreadsIntoUsers = (docs) => {
  return new Promise((resolve, reject) => {
    const transformedThreads = docs.map(doc => {
      return {
        user: doc.participants[0],
        messages: doc.messages
      }
    }).concat(docs.map(doc => {
      return {
        user: doc.participants[1],
        messages: doc.messages
      }
    }));
    const toBeUpdated = [];
    transformedThreads.forEach(doc => {
      toBeUpdated.push(UserSchema.findByIdAndUpdate(doc.user, {messages: doc.messages}));
      Promise.all(toBeUpdated).then(() => resolve(true));
    });
  });
}

let threads;

// -- thread seeder
const seed = (model, threads) => {
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
  .then(() => mongoose.disconnect())
  .catch(err => console.log(err));
}


export default function() {
  return new Promise(resolve => {
    setTimeout(() => {
      seed(ThreadSchema, threads);
      resolve(true);
    }, 500);
  });
};