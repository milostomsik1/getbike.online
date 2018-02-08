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
    async createConversation(parentValue, {user1, user2}, {UserConversation, Conversation}) {
      if (user1 === user2) {
        throw new Error(`User 1 can't be the same as User 2`);
      } else {
        // check if user conversation exists for user1 and user2
        const user1HasUserConversation = Boolean(await UserConversation.findOne({where: {userId: user1}}));
        const user2HasUserConversation = Boolean(await UserConversation.findOne({where: {userId: user2}}));

        if (user1HasUserConversation && user2HasUserConversation) {
          // if YES - throw error
          throw new Error(`Conversation can't be created because both users already belong to a conversation`);
        } else {
          // if NO - create new "Conversation"
          const newConversation = await Conversation.create({});
          const conversationId = newConversation.dataValues.id;
          console.log(conversationId);
          // create 2 user conversations: one for user 1, one for user 2
          
        }

      }
    },
    async updateConversation(parentValue, args, {Conversation}) {
      // await Conversation.update(args, {where: {id: args.id}});
      // return Conversation.findOne({where: {id: args.id}});
    },
    async deleteConversation(parentValue, {id}, {Conversation}) {
      // const conversation = await Conversation.findOne({where: {id}});
      // await Conversation.destroy({where: {id}});
      // return conversation;
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