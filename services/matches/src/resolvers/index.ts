import { Resolvers } from '../../resolvers-types'


import Query from './Query'
import Mutation from './Mutation'
import MatchEntity from './MatchEntity'




export const resolvers: Resolvers = {
  Query: Query,
  Mutation: Mutation,
  MatchEntity: <any>MatchEntity,

}