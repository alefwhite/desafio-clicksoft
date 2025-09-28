import { Exception } from '@adonisjs/core/exceptions'

export default class RoomWithMaximumCapacityException extends Exception {
  constructor() {
    super()
    this.status = 400
    this.message = 'A sala atingiu sua capacidade máxima de estudantes.'
    this.code = 'E_ROOM_MAX_CAPACITY'
  }
}
