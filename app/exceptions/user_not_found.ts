import { Exception } from '@adonisjs/core/exceptions'

export default class UserNotFoundException extends Exception {
  constructor(message = 'Usuário não encontrado.') {
    super()
    this.status = 404
    this.message = message
    this.code = 'E_USER_NOT_FOUND'
  }
}
