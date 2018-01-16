import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import {
  user,
  users,
  addUser,
  updateUser,
  deleteUser
} from './User/user.controller'

import {
  ad,
  ads,
  deleteAd
} from './Ad/ad.controller';

import {
  category,
  categories,
  deleteCategory
} from './Category/category.controller';

import {
  subcategory,
  subcategories,
  deleteSubcategory
} from './Subcategory/subcategory.controller';

import {
  notification,
  notifications,
  deleteNotification
} from './Notification/notification.controller';

import {
  rating,
  ratings,
  deleteRating
} from './Rating/rating.controller';

import {
  message,
  messages,
  deleteMessage
} from './Message/message.controller';

import {
  thread,
  threads,
  deleteThread
} from './Thread/thread.controller';


// -- Root Query Type
const rootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    // -- user
    user,
    users,
    // -- ad
    ad,
    ads,
    // -- category
    category,
    categories,
    // -- subcategory
    subcategory,
    subcategories,
    // -- notification
    notification,
    notifications,
    // -- rating
    rating,
    ratings,
    // -- message
    message,
    messages,
    // -- thread
    thread,
    threads,
  }
});

// -- Root Mutation Type
const rootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    // -- user
    addUser: addUser,
    updateUser, updateUser,
    deleteUser: deleteUser,
    // -- ad
    deleteAd: deleteAd,
    // -- category
    deleteCategory: deleteCategory,
    // -- subcategory
    deleteSubcategory: deleteSubcategory,
    // -- notification
    deleteNotification: deleteNotification,
    // -- rating
    deleteRating: deleteRating,
    // -- message
    deleteMessage: deleteMessage,
    // -- thread
    deleteThread: deleteThread,
  }
});

export default new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType
});