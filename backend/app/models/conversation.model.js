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
      through: {
        model: 'user_conversation'
      }
    });
  }

  return Conversation;
};