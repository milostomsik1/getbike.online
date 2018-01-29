export default (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('subcategory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });

  return Subcategory;
};