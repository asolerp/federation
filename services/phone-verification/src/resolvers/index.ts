import { Resolvers } from '../../resolvers-types'


import Query from './Query'
import Mutation from './Mutation'
import PhoneVerificationEntity from './PhoneVerificationEntity'




export const resolvers: Resolvers = {
  Query: Query,
  Mutation: Mutation,
  PhoneVerificationEntity: <any>PhoneVerificationEntity,

}