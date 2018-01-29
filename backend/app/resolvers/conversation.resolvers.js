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
    async deleteConversation(parentValue, {id}, {Conversation}) {
      const conversation = await Conversation.findOne({where: {id}});
      await Conversation.destroy({where: {id}});
      return conversation;
    },
  },

  Conversation: {

  }
}