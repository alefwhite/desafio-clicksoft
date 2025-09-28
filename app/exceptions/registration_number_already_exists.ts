import { Exception } from '@adonisjs/core/exceptions'

export default class RegistrationNumberAlreadyExistsException extends Exception {
  constructor() {
    super()
    this.status = 400
    this.message = 'Número de matrícula já está em uso.'
    this.code = 'E_REGISTRATION_NUMBER_ALREADY_EXISTS'
  }
}
