function fighters(parent, args, context, info) {
  return context.prisma.fighter.findMany({
    where: { franchiseId: parent.id}
  })
}

function games(parent, args, context, info) {
  return context.prisma.game.findMany({
    where: { franchiseId: parent.id}
  })
}

function company(parent, args, context, info) {
  console.log(parent, args)
  return context.prisma.company.findOne({where: { id: parent.companyId }})
}

module.exports = {
  fighters,
  games,
  company
}