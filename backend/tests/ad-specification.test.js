import axios from 'axios';
const URL = 'http://localhost:4000/graphql';

describe('Specification resolvers work as intended', () => {
  test('Create a specification', async () => {
    const newSpecification = await axios.post(URL, {
      query: `
      mutation {
        createSpecification(
          ad:7
          specificationKey:4
          value:"Specification Test: Create"
        ) {
          id
          ad {
            id
          }
          name
          value
        }
      }`
    });

    const {data} = newSpecification;
    expect(data).toMatchObject({
      "data": {
        "createSpecification": {
          "id": "4",
          "ad": {
            "id": "7"
          },
          "name": "Specification Key | Specification Test: Create",
          "value": "Specification Test: Create"
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
        updateSpecification(
          id:2
          ad:9
          specificationKey:6
          value:"Specification Test: Updated"
        ) {
          id
          ad {
            id
          }
          name
          value
        }
      }`
    });

    const {data} = updatedSpecification;
    expect(data).toMatchObject({
      "data": {
        "updateSpecification": {
          "id": "2",
          "ad": {
            "id": "9"
          },
          "name": "Specification Key | Specification Test: Update",
          "value": "Specification Test: Updated"
        }
      }
    });
  });

  test('Delete a specification', async () => {
    const deletedSpecification = await axios.post(URL, {
      query: `
      mutation {
        deleteSpecification(id:3) {
          id
          ad {
            id
          }
          name
          value
        }
      }`
    });

    const {data} = deletedSpecification;
    expect(data).toMatchObject({
      "data": {
        "deleteSpecification": {
          "id": "3",
          "ad": {
            "id": "10"
          },
          "name": "Specification Key | Specification Test: Delete",
          "value": "Specification Test: Delete"
        }
      }
    });
  });

});