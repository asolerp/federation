const { Match } = require('../models/match')

const MatchEntity = {
  async __resolveReference(match) {
    return await Match.findOne({ _id: match.id });
  },
  admins(match) {
    console.log(match)
    return match.admins.map(adminID => ({ __typename: "UserEntity", id: adminID }))
  },
}

export default MatchEntity