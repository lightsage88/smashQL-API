const _ = require("lodash")

function addFighter(parent, args, context, info) {
  const newFighter = context.prisma.fighter.create({
    data: {
      name: args.name,
      description: args.description,
      image: args.image,
      franchise: { connect: { id: args.franchiseId }}
    }
  })

  return newFighter
}

async function updateFighter(parent, args, context, info) {
  let roster = await context.prisma.fighter.findMany()
  console.log(roster)
  let desiredFighter = await context.prisma.fighter.findOne({where: { id: Number(args.id) }})
  const updatedFighter = {
    id: args.id,
    description: args.description || desiredFighter.description,
    name: args.name || desiredFighter.name,
    image: args.image || desiredFighter.image,
    franchise: { connect: { id: args.franchiseId || desiredFighter.franchiseId }}
  }
  
  await context.prisma.fighter.update({
    where: { id: parseInt(args.id) },
    data: _.omit(updatedFighter, 'id')  
  })
  return updatedFighter
}

async function deleteFighter(parent, args, context, info) {
  await context.prisma.fighter.delete({
    where: { id: Number(args.id) }
  })
  
  let roster = await context.prisma.fighter.findMany()
  return roster
}

async function addGame(parent, args, context, info) {
  const newGame = context.prisma.game.create({
    data: {
      name: args.name,
      franchise: { connect: { id: args.franchiseId }},
      image: args.image,
      description: args.description,
      releaseYear: args.releaseYear
    }
  })

  return newGame
}

async function updateGame(parent, args, context, info) {
  let desiredGame = await context.prisma.game.findOne({where: { id: Number(args.id) }})
  const updatedGame = {
    id: args.id,
    description: args.description || desiredGame.description,
    releaseYear: args.releaseYear || desiredGame.releaseYear,
    name: args.name || desiredGame.name,
    image: args.image || desiredGame.image,
    franchise: { connect: { id: args.franchiseId || desiredGame.franchiseId }}
  }
  
  await context.prisma.game.update({
    where: { id: parseInt(args.id) },
    data: _.omit(updatedGame, 'id')  
  })

  return updatedGame
}

async function deleteGame(parent, args, context, info) {
  await context.prisma.game.delete({
    where: { id: Number(args.id) }
  })
  
  let gameCollection = await context.prisma.game.findMany()
  return gameCollection
}

async function addFranchise(parent, args, context, info) {

  const newFranchise = await context.prisma.franchise.create({
    data: {
      name: args.name,
      image: args.image,
      company: { connect: { id: args.companyId }},
    }
  })

  return newFranchise
}

async function updateFranchise(parent, args, context, info) {
  const desiredFranchise = await context.prisma.franchise.findOne({where: { id: Number(args.id) }})
  let updatedFranchise = {
    id: args.id,
    name: args.name || desiredFranchise.name,
    image: args.image || desiredFranchise.image,
    company: { connect: { id: args.companyId || desiredFranchise.companyId }}
  }

  console.log('hogwash', updatedFranchise)

  return await context.prisma.franchise.update({
    where: { id: parseInt(args.id) },
    data: _.omit(updatedFranchise, 'id')  
  })

   
}

async function addCompany(parent, args, context, info) {
  const newCompany = await context.prisma.company.create({
    data: {
      name: args.name,
      foundingYear: args.foundingYear,
      description: args.description
    }
  })

  return newCompany
}

  // const newGame = context.prisma.game.create({
  //   data: {
  //     name: args.name,
  //     franchise: { connect: { id: args.franchiseId }},
  //     image: args.image,
  //     description: args.description,
  //     releaseYear: args.releaseYear
  //   }
  // })

  // return newGame

module.exports = {
  addCompany,
  addFighter,
  addFranchise,
  addGame,
  updateFighter,
  updateFranchise,
  updateGame,
  deleteFighter,
  deleteGame
}