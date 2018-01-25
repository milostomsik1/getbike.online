// import mongoose from 'mongoose';


// // -- Rating Schema
// export const RatingSchema = mongoose.model('Rating', new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   ad: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Ad'
//   },
//   type: { // value: seller or buyer
//     type: String,
//   },
//   description: { // description of a product, only for seller
//     type: Number,
//     min: 1,
//     max: 5
//   },
//   communication: { // communication quality between seller and buyer
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5
//   },
//   trade: { // how did the product trade go
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5
//   },
//   comment: {
//     type: String,
//     required: true,
//     minlength: 20,
//     maxlength: 500
//   },
//   created: {
//     type: Date,
//     default: Date.now()
//   }

// },
// { versionKey: false }));
