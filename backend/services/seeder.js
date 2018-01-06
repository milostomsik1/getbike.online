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


function linkReference(reference, docs) {
  return new Promise((resolve, reject) => {
    let refs = [];
    docs.forEach(doc => refs.push({key: doc[reference.name], value: doc._id}));
    refs = transformDocuments(refs);
    refs.forEach(ref => {
      reference.model.findByIdAndUpdate(ref.key, {[reference.ref]: ref.value})
      .then(updatedDoc => resolve(updatedDoc))
      .catch(err => reject(err));
    });
  });
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
        // ads have seller(user), when ads are created with seller id those ads arent automatically
        // added back to users(sellers) collection
        // this function takes created docs, checks references and links them back to their references
        const refsToBeLinked = [];
        seedable.references.forEach(reference => {
          refsToBeLinked.push(linkReference(reference, docs));
        })
        Promise.all(refsToBeLinked).then(complete => {
          console.log(`Successfully seeded ${seedable.documents.length} ${seedable.model.modelName}s\n`);
          resolve(docs);
          mongoose.disconnect();
        });
      })
      .catch(err => {
        console.log(err);
        reject(err);
        mongoose.disconnect();
      });
    })
    .catch(err => {
      console.log(`\n${err.message}\n`);
      reject(err);
    });
  });

}
