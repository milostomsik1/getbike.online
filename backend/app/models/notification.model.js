export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    updatedAt: false
  });

  Notification.associate = models => {
    models.Notification.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Notification;
};