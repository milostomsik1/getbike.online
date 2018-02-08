import axios from 'axios';
const URL = 'http://localhost:4000/graphql';


describe('Conversation resolvers work as intended', () => {
  test('Create a conversation', async () => {
    // const newConversation = await axios.post(URL, {
    //   query: `
    //   mutation {
    //     createConversation {
    //       id
    //     }
    //   }`
    // });

    // const {createConversation} = newConversation.data.data;
    // expect(createConversation).toBeTruthy();
  });

  // test('Find a conversation', async () => {
  //   const foundConversation = await axios.post(URL, {
  //     query: `
  //     {
  //       conversation(id:4) {
  //         id
  //       }
  //     }`
  //   });

  //   const {data} = foundConversation;
  //   expect(data).toMatchObject({
  //     "data": {
  //       "conversation": {
  //         "id": "4"
  //       }
  //     }
  //   });
  // });

  // test('Get all conversations', async () => {
  //   const foundCategories = await axios.post(URL, {
  //     query: `
  //     {
  //       conversations {
  //         id
  //       }
  //     }`
  //   });

  //   const {conversations} = foundCategories.data.data;
  //   expect(conversations.length).toBeGreaterThan(0);
  // });

  // test('Update a conversation', async () => {
  //   const conversation = await axios.post(URL, {
  //     query: `{
  //       conversation(id:5){
  //         id
  //         updatedAt
  //       }
  //     }`
  //   });

  //   const {updatedAt} = conversation.data.data.conversation;
  //   const updatedConversation = await axios.post(URL, {
  //     query: `
  //     mutation {
  //       updateConversation(id:5) {
  //         id
  //         updatedAt
  //       }
  //     }`
  //   });

  //   const newUpdatedAt = updatedConversation.data.data.updateConversation.updatedAt;
  //   expect(updatedAt).not.toBe(newUpdatedAt);
  // });

  // test('Delete a conversation', async () => {
  //   const deletedConversation = await axios.post(URL, {
  //     query: `
  //     mutation {
  //       deleteConversation(id:6) {
  //         id
  //       }
  //     }`
  //   });

  //   const {data} = deletedConversation;
  //   expect(data).toMatchObject({
  //     "data": {
  //       "deleteConversation": {
  //         "id": "6"
  //       }
  //     }
  //   });
  // });

});