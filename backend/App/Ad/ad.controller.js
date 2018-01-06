import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType
} from 'graphql';
import { UserType, LocationInputType } from './user.graphql.model'
import { UserSchema } from './user.mongoose.model'


// -- Get User By ID
export const user = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(value, args) {
    return await UserSchema.findById(args.id);
  }
}

// -- Get All Users
export const users = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await UserSchema.find();
  }
}

// -- Add A User
export const addUser = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(LocationInputType)},
  },
  async resolve(value, args) {
    return await UserSchema.create({
      name: args.name,
      email: args.email,
      password: args.password,
      location: args.location,
      canCreateAds: args.canCreateAds,
      created: Date.now(),
      updated: Date.now()
    });
  }
}

// -- Update A User
export const updateUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(value, args) {
    const data = {...args};
    data.updated = Date.now();
    await UserSchema.findByIdAndUpdate(args.id, data)
    return await UserSchema.findById(args.id);
  }
}

// -- Delete A User
export const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(value, args) {
    return await UserSchema.findByIdAndRemove(args.id);
  }
}