import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';


// -- Notification Type
export const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  fields: {
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    created: { type: GraphQLString }
  }
});
