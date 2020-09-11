const { PhoneVerification } = require('../models/phoneVerification')

const MatchEntity = {
  async __resolveReference(pVerification) {
    return await PhoneVerification.findOne({ _id: pVerification.id });
  },
  user(pVerification) {
    console.log(match)
    return  ({ __typename: "UserEntity", id: pVerification.user })
  },
}

export default MatchEntity