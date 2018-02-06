export default {
  Query: {
    conversations(parentValue, args, {Conversation}) {
      return Conversation.findAll();
    },
    conversation(parentValue, {id}, {Conversation}) {
      return Conversation.findOne({where: {id}});
    },
    conversationCount(parentValue, args, {Conversation}) {
      return Conversation.count();
    }
  },

  Mutation: {
    createConversation(parentValue, args, {Conversation}) {
      return Conversation.create({});
    },
    async updateConversation(parentValue, args, {Conversation}) {
      await Conversation.update(args, {where: {id: args.id}});
      return Conversation.findOne({where: {id: args.id}});
    },
    async deleteConversation(parentValue, {id}, {Conversation}) {
      const conversation = await Conversation.findOne({where: {id}});
      await Conversation.destroy({where: {id}});
      return conversation;
    },
  },

  Conversation: {
    messages({id}, args, {Message}) {
      return Message.findAll({where: {conversationId: id}});
    },
    async users({id}, args, {UserConversation, User}) {
      const userConversations = await UserConversation.findAll({where: {conversationId: id}});
      const users = userConversations.map(item => item.dataValues.userId);
      return Promise.all(users.map(user => User.findOne({where: {id: user}})));
    }
  }
}