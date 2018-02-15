import jwt from 'jsonwebtoken';
// // import config from '../../config/db';

export default {
  Query: {
    users(parentValue, args, {User, requireAuth, requireAdmin}) {
      requireAuth();
      requireAdmin();
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
    async login(parentValue, {email, password}, {User}) {
      const userExists = await User.findOne({where: {email}});
      if (!userExists) {
        throw new Error(`Invalid email.`);
      }
      const user = userExists.dataValues;
      if (user.password !== password) {
        throw new Error(`Invalid password.`);
      }
      return jwt.sign(email, process.env.SECRET_KEY);
    },
    register(parentValue, args, {User}) {
      return User.create(args);
    },
    createUser(parentValue, args, {User}) {
      return User.create(args);
    },
    async updateUser(parentValue, args, {User}) {
      await User.update(args, {where: {id: args.id}});
      return User.findOne({where: {id: args.id}});
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