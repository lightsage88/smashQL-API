const _ = require("lodash")

function addFighter(parent, args, context, info) {
  const newFighter = context.prisma.fighter.create({
    data: {
      name: args.name,
      description: args.description,
      image: args.image,
      franchise: { connect: { id: args.franchiseId || undefined }}
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
  
  return await context.prisma.game.update({
    where: { id: parseInt(args.id) },
    data: _.omit(updatedGame, 'id')  
  })

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

  return await context.prisma.franchise.update({
    where: { id: parseInt(args.id) },
    data: _.omit(updatedFranchise, 'id')  
  })  
}

async function deleteFranchise(parent, args, context, info) {
  await context.prisma.franchise.delete({
    where: { id: Number(args.id) }
  })
  
  let franchises = await context.prisma.franchise.findMany()
  return franchises
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

async function updateCompany(parent, args, context, info) {
  const desiredCompany = await context.prisma.company.findOne({where: { id: Number(args.id) }})
  let updatedCompany = {
    id: args.id,
    name: args.name || desiredCompany.name,
    description: args.description || desiredCompany.description,
    foundingYear: args.foundingYear || desiredCompany.foundingYear
  }

  return await context.prisma.company.update({
    where: { id: parseInt(args.id) },
    data: _.omit(updatedCompany, 'id')  
  })  
}

async function deleteCompany(parent, args, context, info) {
   await context.prisma.company.delete({
    where: { id: Number(args.id) }
  })
  
  let companies = await context.prisma.company.findMany()
  return companies
}


module.exports = {
  addCompany,
  addFighter,
  addFranchise,
  addGame,
  updateCompany,
  updateFighter,
  updateFranchise,
  updateGame,
  deleteCompany,
  deleteFighter,
  deleteFranchise,
  deleteGame
}