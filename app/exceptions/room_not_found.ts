import { Exception } from '@adonisjs/core/exceptions'

export default class RoomNotFoundException extends Exception {
  constructor() {
    super()
    this.status = 404
    this.message = 'Sala não encontrada.'
    this.code = 'E_ROOM_NOT_FOUND'
  }
}
