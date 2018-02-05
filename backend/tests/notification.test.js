import axios from 'axios';
const URL = 'http://localhost:4000/graphql';


describe('Notification resolvers work as intended', () => {
  test('Create a notification', async () => {
    const newNotification = await axios.post(URL, {
      query: `
      mutation {
        createNotification(
          user:9
          title:"Notification Test Create"
          content:"Notification Test Create Content"
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
            "id": "9"
          },
          "title": "Notification Test Create",
          "content": "Notification Test Create Content"
        }
      }
    });
  });

  test('Get a notification', async () => {
    const foundNotification = await axios.post(URL, {
      query: `{
        notification(id:6) {
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
          "id": "6",
          "user": {
            "id": "10"
          },
          "title": "Notification Test Find One",
          "content": "Notification Test Find One Content"
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
        deleteNotification(id:7) {
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
          "id": "7",
          "user": {
            "id": "11"
          },
          "title": "Notification Test Delete",
          "content": "Notification Test Delete Content"
        }
      }
    });
  });

});