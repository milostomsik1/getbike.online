'use strict';
function print(text) {
  // console.log('\n//----------------------------------------------------');
  // console.log('// ' + text);
  // console.log('//----------------------------------------------------');
  console.log('\n' + text);
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true });
mongoose.Promise = global.Promise;

// -- TODO: ADD SEEDER
print('Seeding Users...');
var User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));

var counter = 0;
for (let i = 1; i <= 10; i++) {
  try {
    User.create({ name: 'Name ' + i }, function (err, doc) {
      if (err) {
        throw new Error('Error writing data to database.');
      } else {
        console.log(doc);
        counter++;
        if (counter === 10) {
          print('Seed successfully completed. Disconnecting MongoDB.');
          mongoose.disconnect();
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}
