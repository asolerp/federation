const { db } = require('./index')

const Event = {
  async __resolveReference(user) {
      return await db.query.event({ where: { userID: user.id} })
  },
  author(event) {
    return { __typename: "User", id: event.userID }
  },
}

export default Event