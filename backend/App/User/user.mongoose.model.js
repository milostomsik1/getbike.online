import mongoose from 'mongoose';


// -- User Schema
export const UserSchema = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 32
  },
  ads: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Ad'
  },
  canCreateAds: {
    type: Boolean,
    default: true
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Ad'
  },
  ratings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Rating'
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Thread'
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Notification'
  },
  location: {
    type: Object,
    required: true,
  },
  contact: {
    type: Object
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
},
{ versionKey: false }));
