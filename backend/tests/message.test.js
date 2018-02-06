import axios from 'axios';
const URL = 'http://localhost:4000/graphql';

describe('Message resolvers work as intended', () => {
  test('Create a message', async () => {
    const newMessage = await axios.post(URL, {
      query: `
      mutation {
        createMessage(
          user:14
          conversation:1
          content:"Message Test: Create"
        ) {
          user {
            id
          }
          conversation {
            id
          }
          content
        }
      }`
    });

    const {data} = newMessage;
    expect(data).toMatchObject({
      "data": {
        "createMessage": {
          "user": {
            "id": "14"
          },
          "conversation": {
            "id": "1"
          },
          "content": "Message Test: Create"
        }
      }
    });
  });

  test('Get a message', async () => {
    const foundMessage = await axios.post(URL, {
      query: `{
        message(id:1) {
          id
          user {
            id
          }
          conversation {
            id
          }
          content
        }
      }`
    });

    const {data} = foundMessage;
    expect(data).toMatchObject({
      "data": {
        "message": {
          "id": "1",
          "user": {
            "id": "15"
          },
          "conversation": {
            "id": "2"
          },
          "content": "Message Test: Find One"
        }
      }
    });
  });

  test('Get all messages', async () => {
    const foundMessages = await axios.post(URL, {
      query: `
      {
        messages {
          id
        }
      }`
    });

    const { messages } = foundMessages.data.data;
    expect(messages.length).toBeGreaterThan(0);
  });

  test('Delete a message', async () => {
    const deletedMessage = await axios.post(URL, {
      query: `
      mutation {
        deleteMessage(id:2) {
          user {
            id
          }
          conversation {
            id
          }
          content
        }
      }`
    });

    const {data} = deletedMessage;
    expect(data).toMatchObject({
      "data": {
        "deleteMessage": {
          "user": {
            "id": "16"
          },
          "conversation": {
            "id": "3"
          },
          "content": "Message Test: Delete"
        }
      }
    });
  });

});