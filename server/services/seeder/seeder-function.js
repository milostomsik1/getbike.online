export default function seed(name, model, payload, amount) {
  return new Promise((resolve, reject) => {
    model.collection.drop();
    const SEED_START = Date.now();
    const INSERT_QUEUE = [];

    for (let i = 1; i <= amount; i++) {
      INSERT_QUEUE.push(model.create(payload))
    }

    console.log(`[ Seeding ${name} ]`);
    Promise.all(INSERT_QUEUE)
    .then(() => {
      console.log(`Seed successfully completed in ${(Date.now() - SEED_START) / 1000}s, ${amount} seeded.`);
      resolve(true);
    })
    .catch(err => {
      reject(false);
      throw new Error(err);
    });
  })
}