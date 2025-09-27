import { Exception } from '@adonisjs/core/exceptions'

export default class ForbiddenException extends Exception {
  constructor() {
    super()
    this.status = 403
    this.message = 'Acesso negado.'
    this.code = 'E_FORBIDDEN'
  }
}
