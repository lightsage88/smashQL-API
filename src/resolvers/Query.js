function roster(parent, args, context, info) {
  return context.prisma.fighter.findMany()
}

function gameCollection(parent, args, context, info) {
  return context.prisma.game.findMany()
}

function franchiseList(parent, args, context, info) {
  return context.prisma.franchise.findMany()
}

function companies(parent, args, context, info) {
  return context.prisma.company.findMany()
}

module.exports = { 
  companies,
  franchiseList,
  gameCollection,
  roster
}