export default {
  Query: {
    users(parentValue, args, {User}) {
      return User.findAll();
    },
    user(parentValue, {id}, {User}) {
      return User.findOne({where: {id}});
    },
    userCount(parentValue, args, {User}) {
      return User.count();
    }
  },

  Mutation: {
    createUser(parentValue, args, {User}) {
      return User.create(args);
    },
    async updateUser(parentValue, args, {User}) {
      // await User.update(args, {where: {id: args.id}});
      // return User.findOne({where: {id: args.id}});
    },
    async deleteUser(parentValue, {id}, {User}) {
      const user = await User.findOne({where: {id}});
      await User.destroy({where: {id}});
      return user;
    },
  },

  User: {
    ads({id}, args, {Ad}) {
      return Ad.findAll({where: {userId: id}});
    }
  }
}