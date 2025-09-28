import { Exception } from '@adonisjs/core/exceptions'

export default class StudentAlreadyBelongsRoomException extends Exception {
  constructor() {
    super()
    this.status = 400
    this.message = 'Estudante já alocado nesta sala'
    this.code = 'E_STUDENT_ALREADY_BELONGS_ROOM'
  }
}
