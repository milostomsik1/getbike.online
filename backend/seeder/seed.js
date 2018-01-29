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
};

const findOne = (toCheck, search) => {
  if (search.length > toCheck.length) {
    return false;
  } else {
    let counter = 0;
    toCheck.forEach(item => {
      if (search.includes(item)) {
        counter++;
      }
    });
    if (counter === search.length) {
      return true;
    } else {
      return false;
    }
  }
};

const sortByDependencies = files => {
  const orderedFiles = [];
  const modelNames = [];
  while (files.length > 0) {
    files.forEach((file, i) => {
      if (file.dependsOn.length === 0 || findOne(modelNames, file.dependsOn)) {
        orderedFiles.push(file);
        modelNames.push(file.modelName);
        files.splice(i, 1);
      }
    });
  }
  return orderedFiles;
}

const seed = async () => {
  const files = sortByDependencies(getAllSeedableFiles());
  for (const file of files) {
    const model = file.modelName;
    const { data } = file;
    try {
      await db[model].bulkCreate(data);
    } catch (err) {
      console.log(err);
    }
  }
  if (process.env.ONLY_SEEDING) {
    sequelize.close();
  }
};

sequelize.sync({force: true}).then(() => {
  seed();
});