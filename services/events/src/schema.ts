import { gql } from "apollo-server"

const typeDefs = gql`

  type Event @key(fields: "id") {
    id: ID!
    name: String!
    author: User 
  }
  
  extend type User @key(fields: "id") {
    id: ID! @external
  }
  
  extend type Query {
    event(id: String): Event
    events: [Event]
  }

  extend type Mutation {
    newEvent(name: String): Event
  }


`

export { typeDefs }