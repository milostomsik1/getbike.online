export default (sequelize, DataTypes) => {
  const AdSpecification = sequelize.define('ad_specification', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

  return AdSpecification;
};