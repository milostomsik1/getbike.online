import mongoose from 'mongoose';


// -- Notification Schema
export const NotificationSchema = mongoose.model('Notification', new mongoose.Schema({
  user: {
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
  content: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500
  },
  created: {
    type: Date,
    default: Date.now()
  }

},
{ versionKey: false }));
