import { gql } from "apollo-server"

const typeDefs = gql`

  scalar Date


  type PhoneEntity @key(fields: "id") {
    id: ID!
    user: UserEntity!
    code: String!
    phone: String!
    verified: Boolean
  }
  
  extend type UserEntity @key(fields: "id") {
    id: ID! @external
  }
  
  extend type Query {
    phoneVerification(id: String): PhoneEntity
  }

  extend type Mutation {
    updatePhoneVerification(phone: String!): PhoneEntity
    codeVerification(code: String!): PhoneEntity
  }


`

export { typeDefs }