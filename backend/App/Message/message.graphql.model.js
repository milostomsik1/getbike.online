import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';


// -- Message Type
export const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    id: { type: GraphQLID },
    sender: { type: GraphQLID },
    recipient: { type: GraphQLID },
    content: { type: GraphQLString },
    created: { type: GraphQLString }
  }
});
