import Sequelize from 'sequelize';
import config from '../../config/db';
import User from '../User/user.model';

const db = new Sequelize(
  config.db.dbName,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect
  }
);

const Ad = db.define('ad', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  views: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  availability: {
    type: Sequelize.STRING,
    defaultValue: 'Available'
  },
  priceAmount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceCurrency: {
    type: Sequelize.STRING,
    defaultValue: 'EUR'
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Second Hand'
  },
  specifications: {
    type: Sequelize.STRING
  },
  tradable: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  tradeMethods: {
    type: Sequelize.STRING
    // add type: ARRAY here
  },
  images: {
    type: Sequelize.STRING
    // add type: ARRAY here
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: 'Regular'
  },
  isRated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  refreshedAt: {
    type: Sequelize.DATE
    // default date now
  }

  // category
  // subcategory
  // user
  // createdAt
  // updatedAt
});

Ad.sync({force: true});

// Ad.belongsTo(User);

export default Ad;



// export const AdSchema = mongoose.model('Ad', new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   title: {
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 100
//   },
//   views: {
//     type: Number,
//     min: 0,
//     default: 0
//   },
//   availability: {
//     type: String,
//     default: 'available',
//   },
//   price: {
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 9999999
//     },
//     currency: {
//       type: String,
//       default: 'EUR'
//     }
//   },
//   status: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true
//   },
//   subcategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Subcategory',
//     required: true
//   },
//   description: {
//     type: String,
//     required: true,
//     minlength: 20,
//     maxlength: 2000
//   },
//   specifications: {
//     type: String,
//     required: true
//   },
//   thumbnail: {
//     type: String
//   },
//   images: {
//     type: Array
//   },
//   tradable: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   tradeMethods: {
//     type: Array,
//     required: true
//   },
//   type: {
//     name: {
//       type: String,
//       required: true,
//       default: 'regular'
//     },
//     expires: {
//       type: Date,
//       default: null
//     }
//   },
//   isRated: {
//     type: Boolean,
//     default: false
//   },
//   created: {
//     type: Date,
//     default: Date.now()
//   },
//   refreshed: {
//     type: Date,
//     default: Date.now()
//   },
//   updated: {
//     type: Date,
//     default: Date.now()
//   }
// },
// { versionKey: false }));
