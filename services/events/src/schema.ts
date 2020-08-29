import { gql } from "apollo-server"

const typeDefs = gql`

  type Event @key(fields: "id") {
    id: ID!
    name: String
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