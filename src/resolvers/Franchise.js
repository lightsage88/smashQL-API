function fighters(parent, args, context) {
  return context.prisma.fighter.findMany({
    where: { franchiseId: parent.id}
  })
}

module.exports = {
  fighters
}