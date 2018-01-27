import models from '../app/models/index';
const sequelize = models.sequelize;

describe('Tests db connection and table existance', () => {
  test('Connects to the database successfully', async () => {
    let success = true;

    try {
      await sequelize.authenticate();
    } catch (err) {
      success = false;
    }

    expect(success).toEqual(true);
  });

  test('Syncs the models with database', async () => {
    let success = true;

    try {
      await sequelize.sync({force: true});
    } catch (err) {
      success = false;
    }

    expect(success).toEqual(true);
  });

  test('Checks if users table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "users"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });

  test('Checks if ads table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "ads"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });

  test('Checks if category table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "category"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });

  test('Checks if subcategory table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "subcategory"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });

  test('Checks if ratings table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "ratings"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });

  test('Checks if notifications table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "notifications"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });

  test('Checks if conversations table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "conversations"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });

  test('Checks if messages table exists', async () => {
    let success = true;
    try {
      await sequelize.query(`SELECT * FROM "messages"`);
    } catch (err) {
      success = false;
    }
    expect(success).toEqual(true);
  });
});
