function roster(parent, args, context, info) {
  return context.prisma.fighter.findMany()
}

module.exports = { 
  roster
}