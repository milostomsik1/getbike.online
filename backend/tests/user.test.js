import axios from 'axios';
const URL = 'http://localhost:4000/graphql'


// describe('User resolvers work as intended', () => {
  test('Create a user', async () => {
    const newUser = await axios.post(URL, {
      query: `
      mutation {
        createUser(
          name:"Test User"
          email:"testuser@gmail.com"
          password:"123123"
          country:"Serbia"
          city:"Belgrade"
        ) {
          name
          email
          password
          canCreateAds
          country
          city
        }
      }`
    });
    const { data } = newUser;
    expect(data).toMatchObject({
      "data": {
        "createUser": {
          "name": "Test User",
          "email": "testuser@gmail.com",
          "password": "123123",
          "canCreateAds": true,
          "country": "Serbia",
          "city": "Belgrade"
        }
      }
    });
  });

  test('Get created user', async () => {
    const foundUser = await axios.post(URL, {
      query: `
      {
        user(id:1) {
          name
          email
          password
          canCreateAds
          country
          city
        }
      }`
    });

    const { data } = foundUser;
    expect(data).toMatchObject({
      "data": {
        "user": {
          "name": "Test User",
          "email": "testuser@gmail.com",
          "password": "123123",
          "canCreateAds": true,
          "country": "Serbia",
          "city": "Belgrade"
        }
      }
    });
  });

  test('Get all users', async () => {
    const foundUsers = await axios.post(URL, {
      query: `
      {
        users {
          id
        }
      }`
    });

    const users = foundUsers.data.data.users;
    expect(users.length).toBeGreaterThan(0);
  });

  test('Update a user', async () => {
    const updatedUser = await axios.post(URL, {
      query: `
      mutation {
        updateUser(
          id:1
          name:"Updated Name"
          email:"updated@gmail.com"
          password:"Updated"
          country:"Updated Country"
          city:"Updated City"
        ) {
          id
          name
          email
          password
          country
          city
        }
      }`
    });

    const { data } = updatedUser;
    expect(data).toMatchObject({
      "data": {
        "updateUser": {
          "id": "1",
          "name": "Updated Name",
          "email": "updated@gmail.com",
          "password": "Updated",
          "country": "Updated Country",
          "city": "Updated City"
        }
      }
    });
  });

  test('Delete a user', async () => {
    const deletedUser = await axios.post(URL, {
      query: `
      mutation {
        deleteUser(id:1) {
          id
        }
      }`
    });

    const { data } = deletedUser;
    expect(data).toMatchObject({
      "data": {
        "deleteUser": {
          "id": "1"
        }
      }
    });
  });


// });