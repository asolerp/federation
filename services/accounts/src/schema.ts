import { gql } from "apollo-server"

const typeDefs = gql`

  type User @key(fields: "id") {
    id: ID!
    email: String!
    name: String
    password: String!
    phone: String
    events: [Event!] 
  }

  extend type Event @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User]
    loginUser(email: String, password: String): String
  }

  extend type Mutation {
    signUpUser(id: String, name: String, email: String, password: String, eventos: [String]): String
  }


`

export { typeDefs }