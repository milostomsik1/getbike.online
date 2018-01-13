import mongoose from 'mongoose';


// -- Ad Schema
export const AdSchema = mongoose.model('Ad', new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  views: {
    type: Number,
    min: 0,
    default: 0
  },
  availability: {
    type: String,
    default: 'available',
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0,
      max: 9999999
    },
    currency: {
      type: String,
      default: 'EUR'
    }
  },
  status: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 2000
  },
  specifications: {
    type: Object,
    required: true
  },
  thumbnail: {
    type: String
  },
  images: {
    type: Array
  },
  tradable: {
    type: Boolean,
    required: true,
    default: false
  },
  tradeMethods: {
    type: Array,
    required: true
  },
  type: {
    name: {
      type: String,
      required: true,
      default: 'regular'
    },
    expires: {
      type: Date,
      default: null
    }
  },
  isRated: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  },
  refreshed: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
},
{ versionKey: false }));
