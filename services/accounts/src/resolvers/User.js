const { prisma } = require('../generated/prisma-client')

const User = {
  async __resolveReference(user) {
      return await prisma.user({id: user.id })
  },
  async events(user) {
    return user.events.map(event => ({ __typename: "Event", id: event.id }))
  },
}

export default User