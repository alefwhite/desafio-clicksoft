import { Exception } from '@adonisjs/core/exceptions'

export default class UserNotFoundException extends Exception {
  constructor() {
    super()
    this.status = 404
    this.message = 'Usuário não encontrado.'
    this.code = 'E_USER_NOT_FOUND'
  }
}
