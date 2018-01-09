import mongoose from 'mongoose';


// -- Category Schema
export const CategorySchema = mongoose.model('Category', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  subcategories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Subcategory'
  }
},
{ versionKey: false }));
