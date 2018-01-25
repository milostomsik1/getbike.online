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
    createUser(parentValue, args, context) {
      return null;
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
    ads(parentValue, args, context) {
      return ['1'];
    }
  }
}