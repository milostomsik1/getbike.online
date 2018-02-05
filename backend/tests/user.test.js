import axios from 'axios';
const URL = 'http://localhost:4000/graphql';

describe('User resolvers work as intended', () => {
  test('Create a user', async () => {
    const newUser = await axios.post(URL, {
      query: `
      mutation {
        createUser(
          name:"User Test: Create"
          email:"usertestcreate@gmail.com"
          password:"password123"
          country:"Country"
          city:"City"
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
    const {data} = newUser;
    expect(data).toMatchObject({
      "data": {
        "createUser": {
          "name": "User Test: Create",
          "email": "usertestcreate@gmail.com",
          "password": "password123",
          "canCreateAds": true,
          "country": "Country",
          "city": "City"
        }
      }
    });
  });

  test('Get a user', async () => {
    const foundUser = await axios.post(URL, {
      query: `
      {
        user(id:1) {
          id
          name
          email
          password
          canCreateAds
          country
          city
        }
      }`
    });

    const {data} = foundUser;
    expect(data).toMatchObject({
      "data": {
        "user": {
          "id": "1",
          "name": "User Test: Find One",
          "email": "usertestfindone@gmail.com",
          "password": "password123",
          "canCreateAds": true,
          "country": "Country",
          "city": "City"
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

    const { users } = foundUsers.data.data;
    expect(users.length).toBeGreaterThan(0);
  });

  test('Update a user', async () => {
    const updatedUser = await axios.post(URL, {
      query: `
      mutation {
        updateUser(
          id:2
          name:"User Test: Update Name"
          email:"usertestupdatename@email.com"
          password:"updatedPassword123"
          country:"Updated Country"
          city:"Updated City"
        ){
          id
          name
          email
          password
          country
          city
        }
      }`
    });

    const {data} = updatedUser;
    expect(data).toMatchObject({
      "data": {
        "updateUser": {
          "id": "2",
          "name": "User Test: Update Name",
          "email": "usertestupdatename@email.com",
          "password": "updatedPassword123",
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
        deleteUser(id:3) {
          id
          name
          email
          password
          canCreateAds
          country
          city
        }
      }`
    });

    const {data} = deletedUser;
    expect(data).toMatchObject({
      "data": {
        "deleteUser": {
          "id": "3",
          "name": "User Test: Delete",
          "email": "usertestdelete@gmail.com",
          "password": "password123",
          "canCreateAds": true,
          "country": "Country",
          "city": "City"
        }
      }
    });
  });

});