import { Exception } from '@adonisjs/core/exceptions'

export default class RoomNotAvailableException extends Exception {
  constructor() {
    super()
    this.status = 400
    this.message = 'Sala não disponível.'
    this.code = 'E_ROOM_NOT_AVAILABLE'
  }
}
