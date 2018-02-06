import axios from 'axios';
const URL = 'http://localhost:4000/graphql';


describe('Ad resolvers work as intended', () => {
  test('Create an ad', async () => {
    const newAd = await axios.post(URL, {
      query: `
      mutation {
        createAd (
          user: 7
          category: 4
          title:"Ad Test: Create"
          description:"Ad Test: Create - Description"
          priceAmount:100
        ) {
          user {
            id
          }
          category{
            id
          }
          title
          description
          priceAmount
        }
      }`
    });

    const {data} = newAd;
    expect(data).toMatchObject({
      "data": {
        "createAd": {
          "user": {
            "id": "7"
          },
          "category": {
            "id": "4"
          },
          "title": "Ad Test: Create",
          "description": "Ad Test: Create - Description",
          "priceAmount": 100
        }
      }
    });
  });

  test('Get an ad', async () => {
    const foundAd = await axios.post(URL, {
      query: `
      {
        ad(id:1){
          id
          user {
            id
          }
          category {
            id
          }
          title
          description
          priceAmount
        }
      }`
    });

    const {data} = foundAd;
    expect(data).toMatchObject({
      "data": {
        "ad": {
          "id": "1",
          "user": {
            "id": "8"
          },
          "category": {
            "id": "5"
          },
          "title": "Ad Test: Find One",
          "description": "Ad Test: Find One - Description",
          "priceAmount": 100
        }
      }
    });
  });

  test('Get all ads', async () => {
    const foundAds = await axios.post(URL, {
      query: `
      {
        ads {
          id
        }
      }`
    });

    const {ads} = foundAds.data.data;
    expect(ads.length).toBeGreaterThan(0);
  });

  test('Update an ad', async () => {
    const updatedUser = await axios.post(URL, {
      query: `
      mutation {
        updateAd(
          id:2
          user:9
          category:6
          title:"Ad Test: Updated"
          description:"Ad Test: Updated - Description"
          priceAmount:999
        ) {
          id
          user {
            id
          }
          category {
            id
          }
          title
          description
          priceAmount
        }
      }`
    });

    const {data} = updatedUser;
    expect(data).toMatchObject({
      "data": {
        "updateAd": {
          "id": "2",
          "user": {
            "id": "9"
          },
          "category": {
            "id": "6"
          },
          "title": "Ad Test: Updated",
          "description": "Ad Test: Updated - Description",
          "priceAmount": 999
        }
      }
    });
  });

  test('Delete an ad', async () => {
    const deletedAd = await axios.post(URL, {
      query: `
      mutation {
        deleteAd(id:3) {
          id
          user {
            id
          }
          category {
            id
          }
          title
          description
          priceAmount
        }
      }`
    });

    const {data} = deletedAd;
    expect(data).toMatchObject({
      "data": {
        "deleteAd": {
          "id": "3",
          "user": {
            "id": "10"
          },
          "category": {
            "id": "7"
          },
          "title": "Ad Test: Delete",
          "description": "Ad Test: Delete - Description",
          "priceAmount": 100
        }
      }
    });
  });

});