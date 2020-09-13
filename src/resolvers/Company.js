async function franchises(parent, args, context, info) {
  console.log('franchises running',parent, args, context)
  return await context.prisma.franchise.findMany({
    where: {companyId: parent.id}
  })
}


module.exports = {
  franchises
}