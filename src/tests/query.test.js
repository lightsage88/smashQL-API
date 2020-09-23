const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')
const dbSchema = fs.readFileSync(
  path.join('src', 'schema.graphql'), 'utf8'
)
const tester = new EasyGraphQLTester(dbSchema)



describe('queries', () => {


  describe('roster', () => {
    it('should fail an invalid query', () => {
      const invalidQuery = `
        {
          roster {
            id
            pillow
          }
        }
      `
      tester.test(false, invalidQuery)
    })

    it('should pass a valid query', () => {
      const validQuery = `
        {
          roster {
            id
            name
            franchise {
              id
              name
              games {
                id
                name
              }
              company {
                id
                name
              }
            }
          }
        }
      `
      tester.test(true, validQuery)
    })
  })

  describe('gameCollection', () => {
    it('should fail an invalid query', () => {
      const invalidQuery = `
        {
          gameCollection {
            id
            name
            franchise {
              id
              name
            }
            releaseYear
            description
            numberOfPlayers
          }
        }
      `
      tester.test(false, invalidQuery)
    })

    it('should pass a valid query', () => {
      const validQuery = `
        {
          gameCollection {
            id
            name
            franchise {
              id
              name
            }
            releaseYear
            description
          }
        }
      `
      tester.test(true, validQuery)
    })
  })

  describe('companies', () => {
    it('should fail an invalid query', () => {
      const invalidQuery = `
        {
          companies {
            id
            name
            description
            foundingYear
            franchises {
              id
              name
            }
            wikiID
            pigWhistle
          }
        }
      `
      tester.test(false, invalidQuery)
    })

    it('should pass a valid query', () => {
      const validQuery = `
        {
          companies {
            id
            name
            description
            foundingYear
            franchises {
              id
              name
            }
            wikiID
          }
        
        }
      `
      tester.test(true, validQuery)
    })
  })

  describe('franchiseList', () => {
    it('should fail an invalid query', () => {
      const invalidQuery = `
      {
        franchiseList {
          id
          name
          games {
            id
            name
          }
          fighters {
            id
            name
          }
          company {
            id
            name
          }
          wrongThing
        }
      }
      `
      tester.test(false, invalidQuery)
    })

    it('should pass a valid query', () => {
      const validQuery = `
      {
        franchiseList {
          id
          name
          games {
            id
            name
          }
          fighters {
            id
            name
          }
          company {
            id
            name
          }
        }
      }
    `
    tester.test(true, validQuery)
    })
  })

  describe('oneFranchise', () => {
    it('should fail an invalid query', () => {
      const invalidQuery = `
      {
        oneFranchise(id: "x") {
          id
          name
          company {
            id
            name
          }
          games {
            id
            name
          }
          stuff
        }
      }
      `
      tester.test(false, invalidQuery)
    })

    it('should pass a valid query', () => {
      const validQuery = `
        {
          oneFranchise(id: 1) {
            id
            name
            company {
              id
              name
            }
            games {
              id
              name
            }
          }
        }
      `
      tester.test(true, validQuery)
    })
  })


})