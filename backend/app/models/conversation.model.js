export default (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  });

  return Conversation;
};