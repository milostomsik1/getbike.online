import axios from 'axios';
const URL = 'http://localhost:4000/graphql';

describe('Specification resolvers work as intended', () => {
  test('Create a specification', async () => {
    const newSpecification = await axios.post(URL, {
      query: `
      mutation {
        createSpecificationKey(
          category: 11
          name:"Specification Key Test: Create"
        ) {
          category {
            id
          }
          name
        }
      }`
    });

    const {data} = newSpecification;
    expect(data).toMatchObject({
      "data": {
        "createSpecificationKey": {
          "category": {
            "id": "11"
          },
          "name": "Specification Key Test: Create"
        }
      }
    });
  });

  test('Get a specification', async () => {
    const foundSpecification = await axios.post(URL, {
      query: `{
        specification(id:1) {
          id
          ad {
            id
          }
          name
          value
        }
      }`
    });

    const {data} = foundSpecification;
    expect(data).toMatchObject({
      "data": {
        "specification": {
          "id": "1",
          "ad": {
            "id": "8"
          },
          "name": "Specification Key | Specification Test: Find One",
          "value": "Specification Test: Find One"
        }
      }
    });
  });

  test('Get all specifications', async () => {
    const foundSpecifications = await axios.post(URL, {
      query: `
      {
        specifications {
          id
        }
      }`
    });

    const { specifications } = foundSpecifications.data.data;
    expect(specifications.length).toBeGreaterThan(0);
  });

  test('Update a specification', async () => {
    const updatedSpecification = await axios.post(URL, {
      query: `
      mutation {
        updateSpecificationKey(
          id:2
          category:13
          name:"Specification Key Test: Updated"
        ) {
          id
          category {
            id
          }
          name
        }
      }`
    });

    const {data} = updatedSpecification;
    expect(data).toMatchObject({
      "data": {
        "updateSpecificationKey": {
          "id": "2",
          "category": {
            "id": "13"
          },
          "name": "Specification Key Test: Updated"
        }
      }
    });
  });

  test('Delete a specification', async () => {
    const deletedSpecification = await axios.post(URL, {
      query: `
      mutation {
        deleteSpecificationKey(id:3) {
          id
          category {
            id
          }
          name
        }
      }`
    });

    const {data} = deletedSpecification;
    expect(data).toMatchObject({
      "data": {
        "deleteSpecificationKey": {
          "id": "3",
          "category": {
            "id": "14"
          },
          "name": "Specification Key Test: Delete"
        }
      }
    });
  });

});