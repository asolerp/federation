import { Resolvers } from '../../resolvers-types'


import Query from './Query'
import Mutation from './Mutation'
import Event from './Event'



export const resolvers: Resolvers = {
  Query: Query,
  Mutation: Mutation,
  Event: <any>Event
}