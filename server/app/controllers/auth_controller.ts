import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'

import User from '#models/user'

export default class AuthController {
    async register({ request, response }: HttpContext) {
      const payload = await request.validateUsing(registerValidator)
  
      const user = await User.create(payload)
  
      return response.created(user)
    }
    async login({ request, response }: HttpContext) {
        const { username, password } = await request.validateUsing(loginValidator)
        console.log(username, password)    
        const user = await User.verifyCredentials(username, password)
        const token = await User.accessTokens.create(user)
    
        return response.ok({
          token: token,
          ...user.serialize(),
        })
      }

    async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
        return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
    }

    async dataByToken({ auth, response }: HttpContext) {
        const user = auth.getUserOrFail()
        return response.ok(user)
      }
}