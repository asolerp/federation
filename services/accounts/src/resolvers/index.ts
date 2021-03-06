import { Resolvers } from '../../resolvers-types'


import Query from './Query'
import Mutation from './Mutation'
import User from './User'



export const resolvers: Resolvers = {
  Query: Query,
  Mutation: Mutation,
  User: <any>User
}