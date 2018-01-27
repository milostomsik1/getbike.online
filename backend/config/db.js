export default {
  port: 4000,
  // secretKey: 'getbike',
  GraphQLEndpoint: '/graphql',
  db: {
    dbName: 'getbike',
    testDbName: 'getbike_test',
    username: 'milostomsik',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  }
}