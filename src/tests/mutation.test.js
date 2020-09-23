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

  describe("deleteFighter", () => {
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation deleteFighter($id: ID!) {
          deleteFighter(id: $id) {
            nullo
            id
            name
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
      tester.test(false, mutation, {
        id: 8
      })
    })

    it("should pass a valid mutation", () => {
      const mutation = `
        mutation deleteFighter($id: ID!) {
          deleteFighter(id: $id) {
            id
            name
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
        id: 8
      })
    })
  })

  describe("addGame", () => {
    it('should fail an invalid mutation', () => {
      const mutation = `
        mutation addGame($name: String!, $franchiseId: Int, $releaseYear: Int, $description: String) {
          addGame(name: $name, franchiseId: $franchiseId, releaseYear: $releaseYear, description: $description) {
            id
            name
            franchise {
              id
              name
            }
            pigs
          }
        }
      `
      tester.test(false, mutation)
    })
    it('should pass a valid mutation', () => {
      const mutation = `
        mutation addGame($name: String!, $franchiseId: Int, $releaseYear: Int, $description: String) {
          addGame(name: $name, franchiseId: $franchiseId, releaseYear: $releaseYear, description: $description) {
            id
            name
            franchise {
              id
              name
            }
          }
        }
      `
      tester.test(false, mutation)
    })
  })

  describe("updateGame", () => {
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation updateGame($id: ID!, $name: String, $franchiseId: Int, $releaseYear: Int) {
          updateGame(id: $id, name: $name, franchiseId: $franchiseId, releaseYear: $releaseYear) {
            id
            name
            franchise {
              id
              name
            }
            pigs
          }
        }
      `
      tester.test(false, mutation, {
        id: 3,
        name: "Super Fly"
      })
    })

    it("should pass a valid mutation", () => {
      const mutation = `
        mutation updateGame($id: ID!, $name: String, $franchiseId: Int, $releaseYear: Int) {
          updateGame(id: $id, name: $name, franchiseId: $franchiseId, releaseYear: $releaseYear) {
            id
            name
            franchise {
              id
              name
            }
          }
        }
      `
      tester.test(true, mutation, {
        id: 3,
        name: "Super Fly"
      })
    })
  })

  describe("deleteGame", () => {
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation deleteGame($id: ID!) {
          deleteGame(id: $id) {
            id
            name
            franchise {
              pigs
              id
              name
            }
          }
        }
      `
      tester.test(false, mutation)
    })

    it("should pass a valid mutation", () => {
      const mutation = `
        mutation deleteGame($id: ID!) {
          deleteGame(id: $id) {
            id
            name
            franchise {
              id
              name
            }
          }
        }
      `
      tester.test(true, mutation, {
        id: 7
      })
    })
  })

  describe("addFranchise", () => {
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation addFranchise($name: String!, $wikiID: String, $image: String, $companyId: Int, $fighterIDs: [Int], $gameIDs: [Int]) {
          addFranchise(name: $name, wikiID: $wikiID, image: $image, companyId: $companyId, fighterIDs: $fighterIDs, gameIDs: $gameIDs) {
            id
            name
            fighters {
              id
              name
            }
            games {
              id
              name
            }
            pigs
          }
        }
      `
      tester.test(false, mutation, {
        name: "Ronald McDonald Games",
        fighterIDs: [1, 2, 4],
        gameIDs: [1,2,3]

      })
    })

    it("should pass a valid mutation", () => {
      const mutation = `
        mutation addFranchise($name: String!, $wikiID: String, $image: String, $companyId: Int, $fighterIDs: [Int], $gameIDs: [Int]) {
          addFranchise(name: $name, wikiID: $wikiID, image: $image, companyId: $companyId, fighterIDs: $fighterIDs, gameIDs: $gameIDs) {
            id
            name
            fighters {
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
      tester.test(true, mutation, {
        name: "Ronald McDonald Games",
        fighterIDs: [1, 2, 4],
        gameIDs: [1,2,3]
      })
    })
  })

  describe("updateFranchise", () => {
    //fix game[] to be gameIDs[] later
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation updateFranchise($id: ID!, $wikiID: String, $name: String, $image: String, $companyId: Int, $fighterIDs: [Int], $game: [Int]) {
          updateFranchise(id: $id, wikiID: $wikiID, name: $name, image: $image, companyId: $companyId, fighterIDs: $fighterIDs, game: $game) {
            pigs
            id
            name
            games {
              id
              name
            }
          }
        }
      `
      tester.test(false, mutation, {
        id: 8,
        wikiID: "12345",
        name: "Wolbocho"
      })
    })

    it("should pass a valid mutation", () => {
      //todo: switch $id to Int in schema.graphql
      const mutation = `
        mutation updateFranchise($id: Int!, $wikiID: String, $name: String, $image: String, $companyId: Int, $fighterIDs: [Int], $game: [Int]) {
          updateFranchise(id: $id, wikiID: $wikiID, name: $name, image: $image, companyId: $companyId, fighterIDs: $fighterIDs, game: $game) {
            name
            id
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
      tester.test(true, mutation, {
        id: 8,
        name: "Concholocho",
        wikiID: "12341"
      })
    })
  })

  describe("deleteFranchise", () => {
    it("should fail an invalidmutation", () => {
      const mutation = `
        mutation deleteFranchise($id: ID!) {
          deleteFranchise(id: $id) {
            name
            id
            pigs
            games {
              id
              name
            }
          }
        }
      `
      tester.test(false, mutation, {
        id: 3
      })
    })

    it("should pass a valid mutation", () => {
      const mutation = `
        mutation deleteFranchise($id: ID!) {
          deleteFranchise(id: $id) {
            name
            id
            games {
              id
              name
            }
          }
      }      
      `
      tester.test(true, mutation, {
        id: 3
      })
    })
  })

  describe("addCompany", () => {
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation addCompany($id: ID!, $wikiID: Int, $name: String, foundingYear: Int, description: String) {
          addCompany(id: $id, wikiID: $wikiID, name: $name, foundingYear: $foundingYear, description: $description) {
            id
            name
            franchises {
              id
              name
            }
            wikiID
            pigs
          }
        }
      `
      tester.test(false, mutation)
    })
    it("should pass a valid mutation", () => {
      const mutation = `
        mutation addCompany($name: String!, $wikiID: String, $foundingYear: Int, $description: String) {
          addCompany(name: $name, wikiID: $wikiID, foundingYear: $foundingYear, description: $description) {
            id
            name
            franchises {
              id
              name
            }
            wikiID
          }
        }
      `
      tester.test(true, mutation, {
        wikiID: "12345",
        name: "Capillaires",
        foundingYear: 1990,
        description: "Magical Stuff"
      })
    })
  })

  describe("updateCompany", () => {
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation updateCompany($id: ID!, $wikiID: Int, $name: String, $foundingYear: Int, $description: String) {
          updateCompany(id: $id, wikiID: $wikiID, name: $name, foundingYear: $foundingYear, description: $description) {
            id
            name
            fighters {
              id
              name
            }
            franchises {
              id
              name
              games {
                id
                name
              }
            }
            pigs
          }
        }
      `
      tester.test(false, mutation)
    })

    it("should pass a valid mutation", () => {
      //todo: wikiID should be  string, not an int. fix that
      const mutation = `
        mutation updateCompany($id: ID!, $wikiID: Int, $name: String, $foundingYear: Int, $description: String) {
          updateCompany(id: $id, wikiID: $wikiID, name: $name, foundingYear: $foundingYear, description: $description) {
            id
            name
            franchises {
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
        id: 3,
        name: "Coca-Cola",
        wikiID: 12341,
        foundingYear: 1991
      })
    })
  })

  describe("deleteCompany", () => {
    it("should fail an invalid mutation", () => {
      const mutation = `
        mutation deleteCompany($id: ID!) {
          deleteCompany(id: $id) {
            name
            franchises {
              name
              id
            }
            wikiID
            foundingYear
            pigs
          }
        }
      `
      tester.test(false, mutation, {
        id: 3
      })
    })

    it("should pass a valid mutation", () => {
      const mutation = `
        mutation deleteCompany($id: ID!) {
          deleteCompany(id: $id) {
            name
            franchises {
              name
              id
            }
            wikiID
            foundingYear
          }
        }
      `
      tester.test(true, mutation, {
        id: 3
      })
    })
  })
})