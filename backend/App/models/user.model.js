export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    canCreateAds: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // ads
    // favorites
    // ratings
    // conversations
    // notifications
    // contact { phone, ... }
    // createdAt
    // updatedAt
  },
{
  timestamps: false
});

  User.associate = models => {
    models.User.hasMany(models.Ad);
  }

  return User;
};