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

function oneCompany(parent, args, context, info) {
  console.log('oneCompany', parent, args, context, info)

  return context.prisma.company.findOne({
    where: { id: parseInt(args.id) }
  })
}

function oneFranchise(parent, args, context, info) {
  console.log('oneFranchise', parent, args, context, info)
  return context.prisma.franchise.findOne({
    where: { id: parseInt(args.id) }
  })
}

module.exports = { 
  companies,
  franchiseList,
  gameCollection,
  roster,
  oneCompany,
  oneFranchise

}