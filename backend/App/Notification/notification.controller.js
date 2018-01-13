import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import { NotificationType } from './notification.graphql.model'
import { NotificationSchema } from './notification.mongoose.model'


// -- Get Notification By ID
export const notification = {
  type: NotificationType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return NotificationSchema.findById(args.id);
  }
}

// -- Get All Notifications
export const notifications = {
  type: new GraphQLList(NotificationType),
  resolve() {
    return NotificationSchema.find();
  }
}

// -- Delete A Notification
export const deleteNotification = {
  type: NotificationType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return NotificationSchema.findByIdAndRemove(args.id);
  }
}