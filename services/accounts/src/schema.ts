import { gql } from "apollo-server"

const typeDefs = gql`

  scalar Upload

  type UserEntity @key(fields: "id") {
    id: ID!
    name: String
    email: String!
    password: String!
    age: Int,
    height: Int,
    nationality: String
    position: String
    # name: String
    phone: PhoneEntity
    matches: [MatchEntity!] 
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type LoginRespone {
    token: String,
    user: UserEntity
  }

  extend type PhoneEntity @key(fields: "id") {
    id: ID! @external
  }

  extend type MatchEntity @key(fields: "id") {
    id: ID! @external
  }

  type GeneralError {
    message: String!
  }

  type SignUpUserResult {
    token: String
    success: Boolean!
    error: GeneralError
  }

  extend type Query {
    me: UserEntity
    user(id: ID!): UserEntity
    users: [UserEntity]
    loginUser(email: String, password: String): LoginRespone
  }

  extend type Mutation {
    signUpUser(email: String, password: String): SignUpUserResult
    imageUpload(file: Upload!): File!
  }


`

export { typeDefs }