import mongoose from 'mongoose';
mongoose.Promise = global.Promise

function generateSeedable(data) {
  return {
    model: data().model,
    references: data().references,
    documents: (new Array(data().amount)).fill(null).map(item => data().fields)
  }
}

function sortByKey(data) {
  data.sort(function(a, b) {
    let comparison = 0;
    if (a.key !== b.key) comparison = a.key > b.key ? 1 : -1;
    return comparison;
  });
}

function transformDocuments(documents) {
  sortByKey(documents);

  let currKey = documents[0].key;
  let transformedDocuments = [{key: documents[0].key, value: []}];
  let lastKeyIndex = 0;

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

function executeReferenceLinking(references, docs) {
  return new Promise(resolve => {
    const refsToBeLinked = [];
    references.forEach(reference => {
      refsToBeLinked.push(linkReference(reference, docs));
    })
    Promise.all(refsToBeLinked).then(() => resolve(docs));
  })
}


export default function seed(data) {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/getbike', { useMongoClient: true }).then(() => {
      const seedable = generateSeedable(data);

      console.log(`-> Seeding ${seedable.model.modelName}`);
      const SEED_START = Date.now();

      // drops the collection to start from scratch
      seedable.model.collection.drop();
      // inserts generated documents
      seedable.model.create(seedable.documents)
      // ads have seller(user), when ads are created with seller id those ads arent automatically
      // added back to users(sellers) collection
      // this function takes created docs, checks references and links them back to their references
      .then(docs => executeReferenceLinking(seedable.references, docs))
      .then(docs => {
        const SEED_END = Date.now();
        console.log(`Successfully seeded ${seedable.documents.length} ${seedable.model.modelName} items in ${(SEED_END - SEED_START) / 1000}s.\n`);
        resolve(docs);
        mongoose.disconnect();
      })
      .catch(err => {
        reject(err);
        mongoose.disconnect();
      });
    })
    .catch(err => reject(err.message));
  });

}
