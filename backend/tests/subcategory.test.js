import axios from 'axios';
const URL = 'http://localhost:4000/graphql'

let createdSubcategoryId;

describe('Subcategory resolvers work as intended', () => {
  test('Create a subcategory', async () => {
    const newCategory = await axios.post(URL, {
      query: `
      mutation {
        createCategory(
          name:"New Category for Subcategory"
          description:"New Category Description"
        ) {
          id
          name
          description
        }
      }`
    });

    const categoryId = newCategory.data.data.createCategory.id;

    const newSubcategory = await axios.post(URL, {
      query: `
      mutation {
        createSubcategory(
          category:${categoryId}
          name:"New Subcategory"
          description:"New Subcategory Description"
        ) {
          id
          name
          description
          category {
            id
          }
        }
      }`
    });

    const { data } = newSubcategory;
    createdSubcategoryId = newSubcategory.data.data.createSubcategory.id;
    expect(data).toMatchObject({
      "data": {
        "createSubcategory": {
          "id": createdSubcategoryId,
          "name": "New Subcategory",
          "description": "New Subcategory Description",
          "category": {
            "id": categoryId
          }
        }
      }
    });
  });

  test('Find created subcategory', async () => {
    const foundSubcategory = await axios.post(URL, {
      query: `
      {
        subcategory(id:${createdSubcategoryId}) {
          id
          name
          description
        }
      }`
    });

    const { data } = foundSubcategory;
    expect(data).toMatchObject({
      "data": {
        "subcategory": {
          "id": createdSubcategoryId,
          "name": "New Subcategory",
          "description": "New Subcategory Description"
        }
      }
    });
  });

  test('Get all subcategories', async () => {
    const foundSubcategories = await axios.post(URL, {
      query: `
      {
        subcategories {
          id
        }
      }`
    });

    const { subcategories } = foundSubcategories.data.data;
    expect(subcategories.length).toBeGreaterThan(0);
  });

  test('Update a subcategory', async () => {
    const updatedSubcategory = await axios.post(URL, {
      query: `
      mutation {
        updateSubcategory(
          id:1
          name:"Updated Subcategory"
          description:"Updated Subcategory Description"
        ){
          name
          description
        }
      }
      `
    });

    const { data } = updatedSubcategory;
    expect(data).toMatchObject({
      "data": {
        "updateSubcategory": {
          "name": "Updated Subcategory",
          "description": "Updated Subcategory Description"
        }
      }
    });
  });

  test('Delete a subcategory', async () => {
    const deletedSubcategory = await axios.post(URL, {
      query: `
      mutation {
        deleteSubcategory(id:1) {
          id
        }
      }`
    });

    const { data } = deletedSubcategory;
    expect(data).toMatchObject({
      "data": {
        "deleteSubcategory": {
          "id": "1"
        }
      }
    });
  });

});