export default (sequelize, DataTypes) => {
  const UserConversation = sequelize.define('user_conversation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  },
  {
    freezeTableName: true
  }
);

  return UserConversation;
};