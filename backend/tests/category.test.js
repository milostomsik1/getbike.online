import axios from 'axios';
const URL = 'http://localhost:4000/graphql';


describe('Category resolvers work as intended', () => {
  test('Create a category', async () => {
    const newCategory = await axios.post(URL, {
      query: `
      mutation {
        createCategory(
          name:"Category Test: Create"
          description:"Category Test Create Description"
        ) {
          name
          description
        }
      }`
    });

    const {data} = newCategory;
    expect(data).toMatchObject({
      "data": {
        "createCategory": {
          "name": "Category Test: Create",
          "description": "Category Test Create Description"
        }
      }
    });
  });

  test('Get a category', async () => {
    const foundCategory = await axios.post(URL, {
      query: `
      {
        category(id:1) {
          id
          name
          description
        }
      }`
    });

    const {data} = foundCategory;
    expect(data).toMatchObject({
      "data": {
        "category": {
          "id": "1",
          "name": "Category Test: Find One",
          "description": "Category Test: Find One - Description"
        }
      }
    });
  });

  test('Get all categories', async () => {
    const foundCategories = await axios.post(URL, {
      query: `
      {
        categories {
          id
        }
      }`
    });

    const {categories} = foundCategories.data.data;
    expect(categories.length).toBeGreaterThan(0);
  });

  test('Update a category', async () => {
    const updatedCategory = await axios.post(URL, {
      query: `
      mutation {
        updateCategory(
          id:2
          name:"Category Test: Updated"
          description:"Category Test: Updated - Description"
        ){
          id
          name
          description
        }
      }`
    });

    const {data} = updatedCategory;
    expect(data).toMatchObject({
      "data": {
        "updateCategory": {
          "id": "2",
          "name": "Category Test: Updated",
          "description": "Category Test: Updated - Description"
        }
      }
    });
  });

  test('Delete a category', async () => {
    const deletedCategory = await axios.post(URL, {
      query: `
      mutation {
        deleteCategory(id:3) {
          id
          name
          description
        }
      }`
    });

    const {data} = deletedCategory;
    expect(data).toMatchObject({
      "data": {
        "deleteCategory": {
          "id": "3",
          "name": "Category Test: Delete",
          "description": "Category Test: Delete - Description"
        }
      }
    });
  });

});