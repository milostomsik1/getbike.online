export default (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  });

  Conversation.associate = models => {
    models.Conversation.belongsToMany(models.User, {
      onDelete: 'CASCADE',
      through: {
        model: 'user_conversation'
      }
    });
    models.Conversation.hasMany(models.Message, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Conversation;
};