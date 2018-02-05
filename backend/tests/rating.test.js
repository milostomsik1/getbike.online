import axios from 'axios';
const URL = 'http://localhost:4000/graphql';


describe('Rating resolvers work as intended', () => {
  test('Create a rating', async () => {
    const newRating = await axios.post(URL, {
      query: `
      mutation {
        createRating(
          user:11
          ad:4
          type:"Seller"
          adDescription:5
          userCommunication:5
          itemTrade:5
          comment:"Rating Test: Create - Comment"
        ){
          user {
            id
          }
          ad {
            id
          }
          type
          adDescription
          userCommunication
          itemTrade
          comment
        }
      }`
    });

    const {data} = newRating;
    expect(data).toMatchObject({
      "data": {
        "createRating": {
          "user": {
            "id": "11"
          },
          "ad": {
            "id": "4"
          },
          "type": "Seller",
          "adDescription": 5,
          "userCommunication": 5,
          "itemTrade": 5,
          "comment": "Rating Test: Create - Comment"
        }
      }
    });
  });

  test('Get a rating', async () => {
    const foundRating = await axios.post(URL, {
      query: `{
        rating(id:1){
          id
          user {
            id
          }
          ad {
            id
          }
          type
          adDescription
          userCommunication
          itemTrade
          comment
        }
      }`
    });

    const {data} = foundRating;
    expect(data).toMatchObject({
      "data": {
        "rating": {
          "id": "1",
          "user": {
            "id": "12"
          },
          "ad": {
            "id": "5"
          },
          "type": "Seller",
          "adDescription": 5,
          "userCommunication": 5,
          "itemTrade": 5,
          "comment": "Rating Test: Find One - Comment"
        }
      }
    });
  });

  test('Get all ratings', async () => {
    const foundRatings = await axios.post(URL, {
      query: `
      {
        ratings {
          id
        }
      }`
    });

    const {ratings} = foundRatings.data.data;
    expect(ratings.length).toBeGreaterThan(0);
  });

  test('Delete a rating', async () => {
    const deleteRating = await axios.post(URL, {
      query: `
      mutation {
        deleteRating(id:2){
          id
          user {
            id
          }
          ad {
            id
          }
          type
          adDescription
          userCommunication
          itemTrade
          comment
        }
      }`
    });

    const {data} = deleteRating;
    expect(data).toMatchObject({
      "data": {
        "deleteRating": {
          "id": "2",
          "user": {
            "id": "13"
          },
          "ad": {
            "id": "6"
          },
          "type": "Seller",
          "adDescription": 5,
          "userCommunication": 5,
          "itemTrade": 5,
          "comment": "Rating Test: Delete - Comment"
        }
      }
    });
  });

});