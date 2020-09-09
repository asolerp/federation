import { gql } from "apollo-server"

const typeDefs = gql`

  type UserEntity @key(fields: "id") {
    id: ID!
    name: String
    email: String!
    password: String!
    # name: String
    # phone: String
    matches: [MatchEntity!] 
  }

  extend type MatchEntity @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    me: UserEntity
    user(id: ID!): UserEntity
    users: [UserEntity]
    loginUser(email: String, password: String): String
  }

  extend type Mutation {
    signUpUser(email: String, password: String): String
  }


`

export { typeDefs }