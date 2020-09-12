// const { prisma } = require('../generated/prisma-client')
const { User } = require('../models/user')

const UserEntity = {
  async __resolveReference(user) {
      return await User.findOne({ _id: user.id });
  },
  matches(user) {
    return user.matches.map(matchID => ({ __typename: "MatchEntity", id: matchID }))
  },
  phone(user) {
    return ({__typename: "PhoneEntity", id: user.phone})
  }
}

export default UserEntity