import { gql } from "apollo-server"

const typeDefs = gql`

  type User @key(fields: "id") {
    id: ID!
    email: String!
    name: String
    password: String!
    phone: String
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User]
    loginUser(email: String, password: String): String
  }

  extend type Mutation {
    signUpUser(id: String, name: String, email: String, password: String): String
  }


`

export { typeDefs }