const { PhoneVerification } = require('../models/phoneVerification')

const PhoneEntity = {
  async __resolveReference(phone) {
    return await PhoneVerification.findOne({ _id: phone.id });
  },
  user(phone) {
    return  ({ __typename: "UserEntity", id: phone.user })
  },
}

export default PhoneEntity