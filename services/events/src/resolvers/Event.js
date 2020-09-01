const { prisma } = require('../generated/prisma-client')
const Event = {
  async __resolveReference(event) {
      return await prisma.event({ id: event.id })
  },
  author(event) {
    return { __typename: "User", id: event.userID }
  },
}

export default Event