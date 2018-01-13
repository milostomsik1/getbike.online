import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';


// -- Thread Type
export const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  fields: {
    id: { type: GraphQLID },
    participants: { type: new GraphQLList(GraphQLID) },
    ad: { type: GraphQLID },
    messages: { type: new GraphQLList(GraphQLID) },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
