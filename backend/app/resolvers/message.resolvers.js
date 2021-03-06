export default {
  Query: {
    messages(parentValue, args, {Message}) {
      return Message.findAll();
    },
    message(parentValue, {id}, {Message}) {
      return Message.findOne({where: {id}});
    },
    messageCount(parentValue, args, {Message}) {
      return Message.count();
    }
  },

  Mutation: {
    createMessage(parentValue, args, {Message}) {
      return Message.create({
        ...args,
        senderId: args.sender,
        recipientId: args.recipient,
      });
    },
    async deleteMessage(parentValue, {id}, {Message}) {
      const message = await Message.findOne({where: {id}});
      await Message.destroy({where: {id}});
      return message;
    },
  },

  Message: {
    sender({senderId}, args, {User}) {
      return User.findOne({where: {id: senderId}});
    },
    recipient({recipientId}, args, {User}) {
      return User.findOne({where: {id: recipientId}});
    },
  }
}