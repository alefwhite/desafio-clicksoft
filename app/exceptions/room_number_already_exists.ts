import { Exception } from '@adonisjs/core/exceptions'

export default class RoomNumberAlreadyExistsException extends Exception {
  constructor() {
    super()
    this.status = 400
    this.message = 'Você já criou uma sala com este número.'
    this.code = 'E_ROOM_NUMBER_ALREADY_EXISTS'
  }
}
