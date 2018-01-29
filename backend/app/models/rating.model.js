// https://dbdesigner.net/designer/schema/142871 <- DB Schema

export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('rating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adDescription: {
      type: DataTypes.INTEGER
    },
    userCommunication: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemTrade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    updatedAt: false
  });

  Rating.associate = models => {
    models.Rating.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Rating.belongsTo(models.Ad, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Rating;
};