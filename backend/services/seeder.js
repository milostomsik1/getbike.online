import mongoose from 'mongoose';
mongoose.Promise = global.Promise

function generateSeedable(factory) {
  return {
    model: factory().model,
    references: factory().references,
    documents: (new Array(factory().amount)).fill(null).map(item => factory().fields)
  }
}

function transformDocuments(documents) {
  documents.sort(function(a, b) {
    var comparison = 0;
    comparison = a.key > b.key ? 1 : -1;
    return comparison;
  });

  var currKey = documents[0].key;
  var transformedDocuments = [{key: documents[0].key, value: []}];
  var lastKeyIndex = 0;

  documents.forEach(function(item, i) {
    if (item.key === currKey) {
      transformedDocuments[lastKeyIndex].value.push(item.value);
    } else {
      currKey = item.key;
      lastKeyIndex++;
      transformedDocuments.push({key: item.key, value: [item.value]});
    }
  });

  return transformedDocuments;
}

export default function seed(factory) {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true }).then(() => {
      const seedable = generateSeedable(factory);

      console.log(`-> Seeding ${seedable.model.modelName}`);

      // -- drops the collection to start from scratch
      seedable.model.collection.drop();
      // -- inserts generated documents
      seedable.model.create(seedable.documents)
      .then((docs) => {
        // -- links created documents with parent collections
        seedable.references.forEach(reference => {
          let refs = [];
          docs.forEach(doc => {
            refs.push({key: doc[reference.name], value: doc._id});
            // console.log('ad id', doc._id);
            // console.log('seller id', doc[reference.name]);
            // console.log('references', reference.ref);
            // console.log('reference model', reference.model.modelName);
            // reference.model.findById(doc[reference.name]).then(refDoc => {
            //   const updatedValue = refDoc[reference.ref] ? refDoc[reference.ref].push(doc._id) : [doc._id];
            //   reference.model.findByIdAndUpdate(doc[reference.name], {[reference.ref]: updatedValue})
            //   .then(updated => {});
            // });
          });
          refs = transformDocuments(refs);
          console.log(refs);
          console.log('// -- Should insert ' + seedable.model.modelName + 's into ' + reference.model.modelName + ' here.');
        });
        console.log(`Successfully seeded ${seedable.documents.length} ${seedable.model.modelName}s\n`);
        resolve(docs);
        // mongoose.disconnect();
      })
      .catch(err => {
        console.log(err);
        reject(err);
        // mongoose.disconnect();
      });
    })
    .catch(err => {
      console.log(`\n${err.message}\n`);
      reject(err);
    });
  });

}
