
import { Request } from 'express'

interface IGetUserAuthInfoRequest extends Request {
  user: string // or any other type
}

export type ReqWithUser = {  req: IGetUserAuthInfoRequest }