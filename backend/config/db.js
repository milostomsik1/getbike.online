export default {
  port: process.env.PORT || 4000,
  GraphQLEndpoint: '/graphql',
  secret: 'getbike',
  db: {
    dbName: 'getbike',
    testDbName: 'getbike_test',
    username: 'milostomsik',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  }
}