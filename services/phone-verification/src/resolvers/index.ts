import { Resolvers } from '../../resolvers-types'


import Query from './Query'
import Mutation from './Mutation'
import PhoneEntity from './PhoneEntity'




export const resolvers: Resolvers = {
  Query: Query,
  Mutation: Mutation,
  PhoneEntity: <any>PhoneEntity,

}