const User = {
  _resolveReference(object) {
    return users.find(user => user.id === object.id ) 
  }
}

module.exports = User