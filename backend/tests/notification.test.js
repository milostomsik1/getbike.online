import axios from 'axios';
const URL = 'http://localhost:4000/graphql';


describe('Notification resolvers work as intended', () => {
  test('Create a notification', async () => {
    const newNotification = await axios.post(URL, {
      query: `
      mutation {
        createNotification(
          user:4
          title:"Notification Test: Create"
          content:"Notification Test: Create - Content"
        ){
          user {
            id
          }
          title
          content
        }
      }`
    });
    const {data} = newNotification;
    expect(data).toMatchObject({
      "data": {
        "createNotification": {
          "user": {
            "id": "4"
          },
          "title": "Notification Test: Create",
          "content": "Notification Test: Create - Content"
        }
      }
    });
  });

  test('Get a notification', async () => {
    const foundNotification = await axios.post(URL, {
      query: `{
        notification(id:1) {
          id
          user {
            id
          }
          title
          content
        }
      }`
    });

    const {data} = foundNotification;
    expect(data).toMatchObject({
      "data": {
        "notification": {
          "id": "1",
          "user": {
            "id": "5"
          },
          "title": "Notification Test: Find One",
          "content": "Notification Test: Find One - Content"
        }
      }
    });
  });

  test('Get all notifications', async () => {
    const foundNotifications = await axios.post(URL, {
      query: `
      {
        notifications {
          id
        }
      }`
    });

    const { notifications } = foundNotifications.data.data;
    expect(notifications.length).toBeGreaterThan(0);
  });

  test('Delete a notification', async () => {
    const deletedNotification = await axios.post(URL, {
      query: `
      mutation{
        deleteNotification(id:2) {
          id
          user {
            id
          }
          title
          content
        }
      }`
    });

    const {data} = deletedNotification;
    expect(data).toMatchObject({
      "data": {
        "deleteNotification": {
          "id": "2",
          "user": {
            "id": "6"
          },
          "title": "Notification Test: Delete",
          "content": "Notification Test: Delete - Content"
        }
      }
    });
  });

});