var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true });
mongoose.Promise = global.Promise;

console.log('Seeding Users...');
var User = mongoose.model('User', new mongoose.Schema({ name: { type: String } }, { versionKey: false }));
var amount = 100;
var counter = 0;

User.collection.drop();

for (var i = 1; i <= amount; i++) {
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

