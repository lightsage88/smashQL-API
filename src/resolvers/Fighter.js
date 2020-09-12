function franchise(parent, args, context) {
  return context.prisma.franchise.findOne({
    where: {id : parent.franchiseId}
  })
}

module.exports = {
  franchise
}