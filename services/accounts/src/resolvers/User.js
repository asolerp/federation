const User = {
  _resolveReference(object) {
    let users
    return users.find((user) => user.id === object.id ) 
  }
}

export default User