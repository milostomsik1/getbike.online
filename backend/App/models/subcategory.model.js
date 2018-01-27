// https://dbdesigner.net/designer/schema/142871 <- DB Schema

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
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  // SHADY BUSINESS - correct it
  Subcategory.associate = models => {
    models.Subcategory.hasOne(models.Ad, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Subcategory;
};