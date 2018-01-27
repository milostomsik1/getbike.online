import Sequelize from 'sequelize';
import config from '../../config/db';
// https://dbdesigner.net/designer/schema/142871 <- DB Schema


const sequelize = new Sequelize(
  config.db.dbName,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect
  }
);

const models = {
  User: sequelize.import('./user.model'),
  Ad: sequelize.import('./ad.model'),
  Category: sequelize.import('./category.model'),
  Subcategory: sequelize.import('./subcategory.model'),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;


export default models;