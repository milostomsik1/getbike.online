export default {
  Query: {
    notifications(parentValue, args, {Notification}) {
      return Notification.findAll();
    },
    notification(parentValue, {id}, {Notification}) {
      return Notification.findOne({where: {id}});
    },
    notificationCount(parentValue, args, {Notification}) {
      return Notification.count();
    }
  },

  Mutation: {
    createNotification(parentValue, args, {Notification}) {
      return Notification.create({
        ...args,
        userId: args.user
      });
    },
    async deleteNotification(parentValue, {id}, {Notification}) {
      const notification = await Notification.findOne({where: {id}});
      await Notification.destroy({where: {id}});
      return notification;
    },
  },

  Notification: {
    user({userId}, args, {User}) {
      return User.findOne({where: {id: userId}});
    }
  }
}