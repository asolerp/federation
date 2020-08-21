const { gql } = require("apollo-server-express");


const typeDefs = gql`

  type User @key(fields: "id") {
    id: ID!
    email: String!
    name: String
    password: String!
    phone: String
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    signUpUser(id: String, name: String, email: String, password: String): AuthPayLoad!
  }

  type AuthPayLoad {
    token: String!
  }

`

module.exports = {
  typeDefs
}