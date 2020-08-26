const User = {
  _resolveReference(object: any) {
    let users: any
    return users.find((user: any) => user.id === object.id ) 
  }
}

export default User