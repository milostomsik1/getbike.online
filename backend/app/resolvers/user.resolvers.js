// import { check, sanitize, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const register = async (parentValue, args, {User}) => {
  const userExists = await User.findOne({where: {email: args.email}});
  if (userExists) {
    throw new Error('Email already taken.');
  }
  const hash = await bcrypt.hash(args.password, 10);
  return User.create({
    ...args,
    password: hash
  });
}

export default {
  Query: {
    users(parentValue, args, {User}) {
      const x = [1,2,3,4];
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
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        throw new Error(`Invalid password.`);
      }
      return jwt.sign(email, process.env.SECRET_KEY);
    },
    register,
    createUser: register,
    async updateUser(parentValue, args, {User, requireAuth}) {
      requireAuth();
      await User.update(args, {where: {id: args.id}});
      return User.findOne({where: {id: args.id}});
    },
    async deleteUser(parentValue, {id}, {User, requireAuth, requireAdmin}) {
      requireAuth();
      requireAdmin();
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