import { gql } from "apollo-server"

const typeDefs = gql`

  scalar Date

  type MatchEntity @key(fields: "id") {
    id: ID!
    name: String!
    admins: [UserEntity]
    date_event: Date,
    event_image: String 
  }
  
  extend type UserEntity @key(fields: "id") {
    id: ID! @external
  }
  
  extend type Query {
    match(id: String): MatchEntity
    matches: [MatchEntity]
  }

  extend type Mutation {
    newMatch(name: String, admins: [String]): MatchEntity
  }


`

export { typeDefs }