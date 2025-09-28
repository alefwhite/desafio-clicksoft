import { Exception } from '@adonisjs/core/exceptions'

export default class ForbiddenException extends Exception {
  constructor(message = 'Acesso negado') {
    super()
    this.status = 403
    this.message = message
    this.code = 'E_FORBIDDEN'
  }
}
