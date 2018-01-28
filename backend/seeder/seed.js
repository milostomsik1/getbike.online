import db from '../app/models/index';
import fs from 'fs';
import path from 'path';
const sequelize = db.sequelize;

const isFileSeedable = fileName => {
  const regex = RegExp(/.+(\.seed.json)$/);
  return regex.test(fileName);
};

const getAllSeedableFiles = () => {
  const files = fs.readdirSync(path.resolve(__dirname));
  return files.filter(file => isFileSeedable(file))
              .map(file => require(`./${file}`));
}

const seed = async () => {
  const files = getAllSeedableFiles();
  for (const file of files) {
    const model = file.modelName;
    const { data } = file;
    await db[model].bulkCreate(data);
    sequelize.close();
  }
}

sequelize.sync({force: true}).then(() => {
  seed();
});