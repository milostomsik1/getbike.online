export default {
  Query: {
    users(parentValue, args, {User}) {
      return User.findAll();
    },
    user(parentValue, {id}, {User}) {
      return User.findOne({where: {id}});
    }
  },

  Mutation: {
    createUser(parentValue, args, {User}) {
      return User.create(args);
    },
    // updateUser(parentValue, args, context) {
    //   return null;
    // },
    // activateUser(parentValue, args, context) {
    //   return null;
    // },
    // deactivateUser(parentValue, args, context) {
    //   return null;
    // },
    deleteUser(parentValue, args, context) {
      return null;
    },
  },

  User: {
    ads({id}, args, {Ad}) {
      return Ad.findAll({where: {userId: id}});
    }
  }
}