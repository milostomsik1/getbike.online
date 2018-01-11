export const byKeyAscending = function(key) {
  return function(arg1, arg2) {
    return arg1[key] === arg2[key] ? 0 : (arg1[key] > arg2[key] ? 1 : - 1);
  };
}

export const sort = function(arr, key, comparator) {
  return arr.sort(comparator(key));
}

export const randomItem = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const transformDocuments = (documents, KEY, VALUE) => {
  // key = 'seller' -> writes into users with that ID
  // value = '_id' -> IDs of given ads
  // { userId: [ adId, adId, adId] }

  function isUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function getUniqueKeys(arr) {
    return arr.map(item => item[KEY]).filter(isUnique);
  }

  const uniqueKeys = getUniqueKeys(documents);
  const transformedDocuments = uniqueKeys.map(key => {
    return {[key] : []};
  });

  documents.forEach(document => {
    transformedDocuments.forEach(transDoc => {
      if (transDoc[document[KEY]]) {
        transDoc[document[KEY]].push(document[VALUE]);
        // { userId: [ adId, adId, adId] }
      }
    });
  });

  return transformedDocuments;
}