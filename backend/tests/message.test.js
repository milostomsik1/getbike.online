import axios from 'axios';
const URL = 'http://localhost:4000/graphql';

describe('Message resolvers work as intended', () => {
  test('Create a message', async () => {
    const newMessage = await axios.post(URL, {
      query: `
      mutation {
        createMessage(
          sender:14
          recipient:15
          content:"Message Test: Create"
        ) {
          id
          sender {
            id
          }
          recipient {
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
          "id": "3",
          "sender": {
            "id": "14"
          },
          "recipient": {
            "id": "15"
          },
          "content": "Message Test: Create",
        }
      }
    });
  });

  test('Get a message', async () => {
    const foundMessage = await axios.post(URL, {
      query: `{
        message(id:1) {
          id
          sender {
            id
          }
          recipient {
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
          "sender": {
            "id": "14"
          },
          "recipient": {
            "id": "16"
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
          id
          sender {
            id
          }
          recipient {
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
          "id": "2",
          "sender": {
            "id": "14"
          },
          "recipient": {
            "id": "17"
          },
          "content": "Message Test: Delete"
        }
      }
    });
  });

});