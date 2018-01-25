import Sequelize from 'sequelize';
import config from '../../config/db';
import Ad from '../Ad/ad.model';

const db = new Sequelize(
  config.db.dbName,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect
  }
);

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  canCreateAds: {
    type: Sequelize.BOOLEAN
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
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
});

// User.hasMany(Ad);
// User.hasMany(Favorite);
// User.hasMany(Rating);
// User.hasMany(Conversation);
// User.hasMany(Notification);

User.sync({force: true});

export default User;


// export const UserSchema = mongoose.model('User', new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 100
//   },
//   email: {
//     type: String,
//     required: true,
//     minlength: 6,
//     maxlength: 100
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//     maxlength: 32
//   },
//   ads: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Ad'
//   },
//   canCreateAds: {
//     type: Boolean,
//     default: true
//   },
//   favorites: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Ad'
//   },
//   ratings: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Rating'
//   },
//   threads: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Thread'
//   },
//   notifications: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Notification'
//   },
//   location: {
//     type: Object,
//     required: true,
//   },
//   contact: {
//     type: Object
//   },
//   created: {
//     type: Date,
//     default: Date.now()
//   },
//   updated: {
//     type: Date,
//     default: Date.now()
//   }
// },
// { versionKey: false }));
