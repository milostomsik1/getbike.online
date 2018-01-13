import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList
} from 'graphql';

import { AdType } from '../Ad/ad.graphql.model';
import { AdSchema } from '../Ad/ad.mongoose.model';

import { RatingType } from '../Rating/rating.graphql.model';
import { RatingSchema } from '../Rating/rating.mongoose.model';

import { MessageType } from '../Message/message.graphql.model';
import { MessageSchema } from '../Message/message.mongoose.model';

import { NotificationType } from '../Notification/notification.graphql.model';
import { NotificationSchema } from '../Notification/notification.mongoose.model';


// -- Location Input Type
export const LocationInputType = new GraphQLInputObjectType({
  name: 'InputLocation',
  fields: {
    country: { type: GraphQLString },
    city: { type: GraphQLString }
  }
})

// -- Location Output Type
export const LocationOutputType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    country: { type: GraphQLString },
    city: { type: GraphQLString }
  }
});

// -- Contact Input Type
export const ContactInputType = new GraphQLInputObjectType({
  name: 'InputContact',
  fields: {
    phone: { type: GraphQLString }
  }
})

// -- Contact Output Type
export const ContactOutputType = new GraphQLObjectType({
  name: 'Contact',
  fields: {
    phone: { type: GraphQLString },
  }
});


// -- User Type
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    ads: {
      type: new GraphQLList(AdType),
      async resolve(parentValue, args) {
        const ads = [];
        for (const ad of parentValue.ads) {
          ads.push(await AdSchema.findById(ad));
        }
        return ads;
      }
    },
    canCreateAds: { type: GraphQLBoolean },
    favorites: {
      type: new GraphQLList(AdType),
      async resolve(parentValue, args) {
        const ads = [];
        for (const ad of parentValue.ads) {
          ads.push(await AdSchema.findById(ad));
        }
        return ads;
      }
    },
    ratings: {
      type: new GraphQLList(RatingType),
      async resolve(parentValue, args) {
        const ratings = [];
        for (const rating of parentValue.ratings) {
          ratings.push(await RatingSchema.findById(rating));
        }
        return ratings;
      }
    },
    messages: {
      type: new GraphQLList(MessageType),
      async resolve(parentValue, args) {
        const messages = [];
        for (const message of parentValue.messages) {
          messages.push(await MessageSchema.findById(message));
        }
        return messages;
      }
    },
    notifications: {
      type: new GraphQLList(NotificationType),
      async resolve(parentValue, args) {
        const notifications = [];
        for (const notification of parentValue.notifications) {
          notifications.push(await NotificationSchema.findById(notification));
        }
        return notifications;
      }
    },
    location: { type: LocationOutputType },
    contact: { type: ContactOutputType },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  })
});
