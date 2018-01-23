import mongoose from 'mongoose';


// -- Message Schema
export const MessageSchema = mongoose.model('Message', new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500
  },
  deletedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now()
  }
},
{ versionKey: false }));
