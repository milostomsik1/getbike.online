// https://dbdesigner.net/designer/schema/142871 <- DB Schema
import Sequelize from 'sequelize';

// -- Set .env Variables
require('dotenv').config({path: './app/.env'});

const DB_NAME = process.env.TESTING ? process.env.DB_NAME_TEST : process.env.DB_NAME;

const sequelize = new Sequelize(
  DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

const models = {
  User: sequelize.import('./user.model'),
  Ad: sequelize.import('./ad.model'),
  Category: sequelize.import('./category.model'),
  Rating: sequelize.import('./rating.model'),
  Notification: sequelize.import('./notification.model'),
  Message: sequelize.import('./message.model'),
  Specification: sequelize.import('./specification.model'),
  AdSpecification: sequelize.import('./ad-specification.model'),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;


export default models;