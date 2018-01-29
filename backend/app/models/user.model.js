export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER
    },
    canCreateAds: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  User.associate = models => {
    models.User.hasMany(models.Ad, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.User.hasMany(models.Message, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.User.belongsToMany(models.Conversation, {
      onDelete: 'CASCADE',
      through: {
        model: 'user_conversation'
      }
    });
  }

  return User;
};