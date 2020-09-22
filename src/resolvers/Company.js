async function franchises(parent, args, context, info) {
  return await context.prisma.franchise.findMany({
    where: {companyId: parent.id}
  })
}


module.exports = {
  franchises
}