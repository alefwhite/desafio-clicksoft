import { Exception } from '@adonisjs/core/exceptions'

export default class ErrorEmailAlreadyExists extends Exception {
  constructor() {
    super()
    this.status = 400
    this.message = 'Email já cadastrado.'
    this.code = 'E_EMAIL_ALREADY_EXISTS'
  }
}
