import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { UserType } from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'

/**
 * Student middleware is used to ensure only students can access certain routes
 */
export default class StudentMiddleware {
  async handle(ctx: HttpContext, next: NextFn): Promise<void> {
    const { auth } = ctx

    if (!auth.user) {
      throw new Exception('Usuário não autenticado', {
        status: 401,
        code: 'E_UNAUTHORIZED',
      })
    }

    if (auth.user.userType !== UserType.STUDENT) {
      throw new Exception('Acesso negado. Apenas estudantes podem acessar esta rota.', {
        status: 403,
        code: 'E_FORBIDDEN',
      })
    }

    await next()
  }
}
