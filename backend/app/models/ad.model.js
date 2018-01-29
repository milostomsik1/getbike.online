// https://dbdesigner.net/designer/schema/142871 <- DB Schema

export default (sequelize, DataTypes) => {
  const Ad = sequelize.define('ad', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    specifications: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceCurrency: {
      type: DataTypes.STRING,
      defaultValue: 'EUR'
    },
    availability: {
      type: DataTypes.STRING,
      defaultValue: 'Available'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Second Hand'
    },
    typeName: {
      type: DataTypes.STRING,
      defaultValue: 'Free'
    },
    typeExpireDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    shippingMethods: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isTradable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isRated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    refreshedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });


  Ad.associate = models => {
    models.Ad.belongsTo(models.Category, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      },
    });
    models.Ad.belongsTo(models.Subcategory, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Ad;
};