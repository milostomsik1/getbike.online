export default (sequelize, DataTypes) => {
  const Specification = sequelize.define('specification', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Specification.associate = models => {
    models.Specification.belongsToMany(models.Ad, {
      onDelete: 'CASCADE',
      through: {
        model: 'ad_specification'
      }
    });
  }

  return Specification;
};