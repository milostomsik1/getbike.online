import axios from 'axios';
const URL = 'http://localhost:4000/graphql'

let createdCategoryId;

describe('Category resolvers work as intended', () => {
  test('Create a category', async () => {
    const newCategory = await axios.post(URL, {
      query: `
      mutation {
        createCategory(
          name:"New Category"
          description:"New Category Description"
        ) {
          id
          name
          description
        }
      }`
    });

    const { data } = newCategory;
    createdCategoryId = data.data.createCategory.id;
    expect(data).toMatchObject({
      "data": {
        "createCategory": {
          "id": createdCategoryId,
          "name": "New Category",
          "description": "New Category Description"
        }
      }
    });
  });

  test('Find created category', async () => {
    const foundCategory = await axios.post(URL, {
      query: `
      {
        category(id:${createdCategoryId}) {
          name
          description
        }
      }`
    });

    const { data } = foundCategory;
    expect(data).toMatchObject({
      "data": {
        "category": {
          "name": "New Category",
          "description": "New Category Description"
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

    const { categories } = foundCategories.data.data;
    expect(categories.length).toBeGreaterThan(0);
  });

  test('Update a category', async () => {
    const updatedCategory = await axios.post(URL, {
      query: `
      mutation {
        updateCategory(
          id:1
          name:"Updated Category"
          description:"Updated Category Description"
        ){
          name
          description
        }
      }
      `
    });

    const { data } = updatedCategory;
    expect(data).toMatchObject({
      "data": {
        "updateCategory": {
          "name": "Updated Category",
          "description": "Updated Category Description"
        }
      }
    });
  });

  test('Delete a category', async () => {
    const deletedCategory = await axios.post(URL, {
      query: `
      mutation {
        deleteCategory(id:1) {
          id
        }
      }`
    });

    const { data } = deletedCategory;
    expect(data).toMatchObject({
      "data": {
        "deleteCategory": {
          "id": "1"
        }
      }
    });
  });

});