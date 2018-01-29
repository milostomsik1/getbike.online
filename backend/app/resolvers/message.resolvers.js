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
      return Message.create(args);
    },
    async deleteMessage(parentValue, {id}, {Message}) {
      const message = await Message.findOne({where: {id}});
      await Message.destroy({where: {id}});
      return message;
    },
  },

  Message: {
    user({id}, args, {User}) {
      return User.findAll({where: {messageId: id}});
    },
    conversation({id}, args, {Conversation}) {
      return Conversation.findAll({where: {messageId: id}});
    },
  }
}