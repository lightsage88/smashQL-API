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
    // franchiseId: args.franchiseId || desiredFighter.franchiseId
  }
  
  await context.prisma.fighter.update({
    where: { id: parseInt(args.id) },
    // data: {
    //   description: updatedFighter.description,
    //   name: updatedFighter.name,
    //   image: updatedFighter.image,
    //   franchise: updatedFighter.franchise
    // }
    data: _.omit(updatedFighter, 'id')
    
  })

  return updatedFighter
}

module.exports = {
  addFighter,
  updateFighter
}