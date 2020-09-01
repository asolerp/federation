import { Prisma } from 'prisma-binding'
import path from 'path'

export const db = new Prisma({
  typeDefs: path.resolve(__dirname, '../src/generated/prisma-schema.graphql'),
  endpoint: process.env.PRISMA_URL,
  secret: "mysecret"
})