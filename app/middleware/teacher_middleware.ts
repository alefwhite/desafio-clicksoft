import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { UserType } from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'

/**
 * Teacher middleware is used to ensure only teachers can access certain routes
 */
export default class TeacherMiddleware {
  async handle(ctx: HttpContext, next: NextFn): Promise<void> {
    const { auth } = ctx

    if (!auth.user) {
      throw new Exception('Usuário não autenticado', {
        status: 401,
        code: 'E_UNAUTHORIZED',
      })
    }

    if (auth.user.userType !== UserType.TEACHER) {
      throw new Exception('Acesso negado. Apenas professores podem acessar esta rota.', {
        status: 403,
        code: 'E_FORBIDDEN',
      })
    }

    await next()
  }
}
