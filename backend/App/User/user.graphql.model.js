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


const id = {
  type: GraphQLID
};

const name = {
  type: GraphQLString
};

const email = {
  type: GraphQLString
};

const password = {
  type: GraphQLString
};

const ads = {
  type: new GraphQLList(AdType),
  args: {
    category: { type: GraphQLID },
    subcategory: { type: GraphQLID }
  },
  async resolve(parentValue, args) {
    const noArgs = !Boolean(Object.keys(args).length);
    const ads = [];

    for (const ad of parentValue.ads) {
      const doc = await AdSchema.findById(ad);
      const isArgCategory = args.category && args.category == doc.category;
      const isArgSubcategory = args.subcategory && args.subcategory == doc.subcategory;

      if (noArgs || isArgCategory || isArgSubcategory) {
        ads.push(doc);
      }
    }

    return ads;
  }
}

const canCreateAds = {
  type: GraphQLBoolean
};

const favorites = {
  type: new GraphQLList(AdType),
  async resolve(parentValue, args) {
    const ads = [];
    for (const ad of parentValue.ads) {
      ads.push(await AdSchema.findById(ad));
    }
    return ads;
  }
};

const ratings = {
  type: new GraphQLList(RatingType),
  async resolve(parentValue, args) {
    const ratings = [];
    for (const rating of parentValue.ratings) {
      ratings.push(await RatingSchema.findById(rating));
    }
    return ratings;
  }
};

const messages = {
  type: new GraphQLList(MessageType),
  async resolve(parentValue, args) {
    const messages = [];
    for (const message of parentValue.messages) {
      messages.push(await MessageSchema.findById(message));
    }
    return messages;
  }
};

const notifications = {
  type: new GraphQLList(NotificationType),
  async resolve(parentValue, args) {
    const notifications = [];
    for (const notification of parentValue.notifications) {
      notifications.push(await NotificationSchema.findById(notification));
    }
    return notifications;
  }
};

const location = {
  type: LocationOutputType
};

const contact = {
  type: ContactOutputType
};

const created = {
  type: GraphQLString
};

const updated = {
  type: GraphQLString
};


// -- User Type
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id,
    name,
    email,
    password,
    ads,
    canCreateAds,
    favorites,
    ratings,
    messages,
    notifications,
    location,
    contact,
    created,
    updated
  })
});
