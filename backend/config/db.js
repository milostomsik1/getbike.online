export default {
  port: process.env.PORT || 4000,
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