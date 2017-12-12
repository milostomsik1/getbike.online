'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true });
mongoose.Promise = global.Promise;

// -- TODO: ADD SEEDER
console.log('Seeding Users...');
var User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));

var counter = 0;
var amount = 100;

User.collection.drop()

for (let i = 1; i <= amount; i++) {
  try {
    User.create({ name: 'Name ' + i }, function (err, doc) {
      if (err) {
        throw new Error('Error writing data to database.');
      } else {
        counter++;
        if (counter === amount) {
          User.find({}, function (err, doc) {
            if (err) throw new Error(err);
            console.log('Total docs: ' + doc.length);
            console.log('Seed successfully completed.');
            mongoose.disconnect();
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}

