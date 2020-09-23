const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')
const dbSchema = fs.readFileSync(
  path.join('src', 'schema.graphql'), 'utf8'
)
const tester = new EasyGraphQLTester(dbSchema)

describe('mutations', () => {
  describe("addFighter", () => {
    it('should fail an invalid mutation', () => {
      const mutation = `
        mutation addFighter($name: String!, $description: String, $image: String, $franchiseId: Int) {
          addFighter(name: $name, description: $description, image: $image, franchiseId: $franchiseId) {
            id
            name
            description
            porcupines
          }
        }
      `
      tester.test(false, mutation, {
        name: "Spider-Man",
        description: "The Wall-Crawler swings into the fray!",
        franchiseId: 8
      })
    })

    it('should pass a valid mutation', () => {
      const mutation = `
            mutation addFighter($name: String!, $description: String, $image: String, $franchiseId: Int) {
              addFighter(name: $name, description: $description, image: $image, franchiseId: $franchiseId) {
                id
                name
                description
              }
            }
          `
          tester.test(true, mutation, {
            name: "Spider-Man",
            description: "The Wall-Crawler swings into the fray!",
            franchiseId: 8
          })
    })    
  })

  describe("updateFighter", () => {
    it('should fail an invalid mutation', () => {
      const mutation = `
        mutation updateFighter($id: ID!, $name: String, $description: String, $image: String, $franchiseId: Int) {
          updateFighter(id: $id, name: $name, description: $description, image: $image, franchiseId: $franchiseId) {
            id
            name
            description
            franchise {
              id
              name
              games {
                id
                name
              }
              pigs
            }
          }
        }
      `
      tester.test(false, mutation, {
        id: 9,
        name: "Venom",
        description: "The Wall-Crawler's doppelganger swings into the fray!",
        franchiseId: 8
      })
    })

    it('should pass a valid mutation', () => {
      const mutation = `
        mutation updateFighter($id: ID!, $name: String, $description: String, $image: String, $franchiseId: Int) {
          updateFighter(id: $id, name: $name, description: $description, image: $image, franchiseId: $franchiseId) {
            id
            name
            description
            franchise {
              id
              name
              games {
                id
                name
              }
            }
          }
        }
      `
      tester.test(true, mutation, {
        id: 9,
        name: "Venom",
        description: "The Wall-Crawler's doppelganger swings into the fray!",
        franchiseId: 8
      })
    })
  })


})