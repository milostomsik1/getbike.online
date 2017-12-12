export default function seed(item) {
  return new Promise((resolve, reject) => {
    item.model.collection.drop();
    const DB_INSERT_QUEUE = [];

    while (DB_INSERT_QUEUE.length < item.amount) {
      DB_INSERT_QUEUE.push(item.model.create(item.payload))
    }

    console.log(`\n[ Seeding ${item.name} ]`);
    const SEED_START = Date.now();
    Promise.all(DB_INSERT_QUEUE)
    .then(() => {
      console.log(`Seed successfully completed in ${(Date.now() - SEED_START) / 1000}s, ${item.amount} ${item.name.toLowerCase()} seeded.`);
      resolve(true);
    })
    .catch(err => {
      reject(err);
    });
  })
}