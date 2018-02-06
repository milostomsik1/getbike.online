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
        userId: args.user,
        conversationId: args.conversation
      });
    },
    async deleteMessage(parentValue, {id}, {Message}) {
      const message = await Message.findOne({where: {id}});
      await Message.destroy({where: {id}});
      return message;
    },
  },

  Message: {
    user({userId}, args, {User}) {
      return User.findOne({where: {id: userId}});
    },
    conversation({conversationId}, args, {Conversation}) {
      return Conversation.findOne({where: {id: conversationId}});
    }
  }
}