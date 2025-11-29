import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  /**
   * Registrar um novo usuário
   */
  async register({ request, response }: HttpContext) {
    try {
      const registerValidator = vine.compile(
        vine.object({
          fullName: vine.string().trim().minLength(3).maxLength(255),
          email: vine.string().trim().email().normalizeEmail(),
          password: vine.string().minLength(8).maxLength(255),
        })
      )

      const payload = await request.validateUsing(registerValidator)

      // Verificar se o email já existe
      const existingUser = await User.findBy('email', payload.email)
      if (existingUser) {
        return response.conflict({ message: 'Email já cadastrado' })
      }

      const user = await User.create(payload)

      return response.created({
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao registrar usuário', error })
    }
  }

  /**
   * Login de usuário
   */
  async login({ request, response }: HttpContext) {
    try {
      const loginValidator = vine.compile(
        vine.object({
          email: vine.string().trim().email().normalizeEmail(),
          password: vine.string().minLength(8),
        })
      )

      const { email, password } = await request.validateUsing(loginValidator)

      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return response.ok({
        message: 'Login realizado com sucesso',
        token: token.value!.release(),
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      })
    } catch (error) {
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }
  }

  /**
   * Logout de usuário
   */
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return response.ok({ message: 'Logout realizado com sucesso' })
    } catch (error) {
      return response.unauthorized({ message: 'Token inválido' })
    }
  }

  /**
   * Obter usuário autenticado
   */
  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      return response.ok({
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      })
    } catch (error) {
      return response.unauthorized({ message: 'Não autenticado' })
    }
  }
}
