const bcrypt = require('bcryptjs') 

const encrypt = async (password) => {
  return await bcrypt.hash(password, 10)
}

module.exports = { encrypt }