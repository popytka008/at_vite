import jwt   from 'jsonwebtoken'
import {env} from '../lib/env.js'

export const signJWT = (userId: string): string =>
  jwt.sign(userId, env.JWT_SECRET)
