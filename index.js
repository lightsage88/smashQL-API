const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {

  // await prisma.company.create({
  //   data: {
  //     name: "Nintendo",
  //     foundingYear: 1889,
  //     description: "A Japanese multinational consumer electronics and video game company headquartered in Kyoto. Nintendo was originally founded as a handmade playing card company"
  //   }
  // })

  // allCompanies = await prisma.company.findMany()
  // console.log("allCompanies", allCompanies)

//Learned that to connect things you have to get that part and do a 'connect' object where we link the id to the field that is the non=foreign key
//something like that...derp
  // await prisma.franchise.create({
  //   data: {
  //     name: "Super Mario Bros.",
  //     company: {
  //       connect: {
  //        id: 1
  //       }
  //     }
  //   }
  // })

  // allFranchises = await prisma.franchise.findMany()
  // console.log('all franc', allFranchises)

  // await prisma.fighter.create({
  //   data: {
  //     name: "Mario",
  //     description: "A mustachioed plumber, ostensibly from Brooklyn, New York who serves as the protector of the Mushroom Kingdom.",
  //     franchise: {
  //       connect: {
  //         id: 1
  //       }
  //     }
  //   }
  // })

  // allFighters = await prisma.fighter.findMany()
  // console.log("allFighters", allFighters)
  // const information = await prisma.fighter.findMany({
  //   include: {
  //     franchise: {
  //       select: {
  //         id: true,
  //         name: true,
  //         company: {
  //           select:{
  //           name:true,
  //           description: true
  //           }
  //         }
  //       }
  //     }
  //   }
  // })

  // console.log(information)

  await prisma.game.create({
    data: {
      name: "Super Mario 64",
      franchise: {
        connect: {
          id: 1
        }
      },
      releaseYear: 1996,
    }
  })


  const result = await prisma.fighter.findOne({
    where: {id: 1},
    select: {
   
      name: true,
      franchise: {
        select: {
          name: true,
          game:{
            select: {
              name: true
            }
          },
          company: {
            select: {
              name: true,
              description: true
            }
          }
        }
      }
    }
  })

  console.log(result)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })