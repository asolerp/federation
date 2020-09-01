const { db } = require('../db')

const User = {
  async __resolveReference(user) {
      return await db.query.user({ where: { id: user.id} })
  },
  // async events(user) {
  //   console.log(user)
  //   const userDB = await db.query.user({ where: { id: user.id } } )
  //   console.log(userDB)
  //   return userDB.events.map(eventID => ({ __typename: "Event", id: eventID }))
  // },
}

export default User