import Sequelize from 'sequelize';
import config from '../../config/db';

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
  User: sequelize.import('./user'),
  Ad: sequelize.import('./ad'),
};


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;