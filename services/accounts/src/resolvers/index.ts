import { Resolvers } from '../../resolvers-types'


import Query from './Query'
import Mutation from './Mutation'
import UserEntity from './UserEntity'



export const resolvers: Resolvers = {
  Query: Query,
  Mutation: Mutation,
  UserEntity: <any>UserEntity
}