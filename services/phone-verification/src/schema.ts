import { gql } from "apollo-server"

const typeDefs = gql`

  scalar Date

  type PhoneVerificationEntity @key(fields: "id") {
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
    phoneVerification(id: String): PhoneVerificationEntity
  }


`

export { typeDefs }