export default (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });

  Category.associate = models => {
    models.Category.hasMany(models.Category, {
      // onDelete: 'CASCADE',
      // foreignKey: {
      //   allowNull: true
      // }
    });
  }

  return Category;
};