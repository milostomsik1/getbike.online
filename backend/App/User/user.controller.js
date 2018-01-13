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
  resolve(parentValue, args) {
    return UserSchema.findById(args.id);
  }
}

// -- Get All Users
export const users = {
  type: new GraphQLList(UserType),
  resolve() {
    return UserSchema.find();
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
  resolve(parentValue, args) {
    return UserSchema.create({
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
  resolve(parentValue, args) {
    const data = {...args};
    data.updated = Date.now();
    UserSchema.findByIdAndUpdate(args.id, data)
    return UserSchema.findById(args.id);
  }
}

// -- Delete A User
export const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    return UserSchema.findByIdAndRemove(args.id);
  }
}