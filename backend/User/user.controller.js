import mongoose from 'mongoose';
import {
  GraphQLString,
  GraphQLList
} from 'graphql';
import { UserType, UserSchema } from './user.model'


export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLString }
  },
  async resolve(value, args) {
    return await UserSchema.findById(args.id);
  }
}

export const users = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await UserSchema.find();
  }
}