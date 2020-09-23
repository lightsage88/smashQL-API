// 'use strict'

// const EasyGraphQLTester = require('easygraphql-tester')
// const fs = require('fs')
// const path = require('path')

// const Query = require('../resolvers/Query')
// const Mutation = require('../resolvers/Mutation')
// const Game = require('../resolvers/Game')
// const Franchise = require('../resolvers/Franchise')
// const Fighter = require('../resolvers/Fighter')
// const Company = require('../resolvers/Company')
// const resolvers = [Query, Mutation, Game, Franchise, Fighter, Company]
// const dbSchema = fs.readFileSync(
//   path.join('src', 'schema.graphql'), 'utf8'
// )
// const tester = new EasyGraphQLTester(dbSchema)

// const query = `
//   query {
//     roster {
//       id
//       name
//     }
//   }
// `
// const fixture = {
//   data: {
//     roster: {
//       id: 1,
//       name: "Mario"
//     }
//   }
// }


// // it('should so something', () => {
// //   // tester.test(true, query)
// //   // const { data: { query } } = tester.mock({ query, fixture, validateDeprecated: true})
// //   // tester.mock({ query, fixture, validateDeprecated: true})
// //   tester.graphql(query)
// //   .then(result => console.log(result))
// //   .catch(err => console.log(err))
// // })

// module.exports = {
//   tester
// }