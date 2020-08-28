import { gql } from "apollo-server"

const typeDefs = gql`

  type Event @key(fields: "id") {
    id: ID!
    name: String
  }

  extend type Query {
    event: Event
  }


`

export { typeDefs }