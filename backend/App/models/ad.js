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
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    availability: {
      type: DataTypes.STRING,
      defaultValue: 'Available'
    },
    priceAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceCurrency: {
      type: DataTypes.STRING,
      defaultValue: 'EUR'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Second Hand'
    },
    specifications: {
      type: DataTypes.STRING
    },
    tradable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tradeMethods: {
      type: DataTypes.ARRAY(DataTypes.STRING)
      // add type: ARRAY here
    },
    images: {
      type: DataTypes.STRING
      // add type: ARRAY here
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Regular'
    },
    isRated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    refreshedAt: {
      type: DataTypes.DATE
      // default date now
    }

    // category
    // subcategory
    // user
    // createdAt
    // updatedAt
  }, {
    timestamps: false
  });

  return Ad;
};