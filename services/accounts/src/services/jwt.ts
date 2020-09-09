import jwt from 'jsonwebtoken'

export class Jwtoken {

  static readonly privateKey = 'f1BtnWgD3VKY'
  static readonly algorithm = 'HS256'
  static readonly expiresIn = '1d'
  
  static sign(userID: string, email: string) {

    return jwt.sign({
      id: userID,
      email: email
    }, this.privateKey, { algorithm: this.algorithm, subject: userID, expiresIn: "1d" })

  }
}