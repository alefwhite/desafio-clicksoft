import { CreateRoomService } from '#services/create_room'
import { RoomDatabase } from '../../repositories/room.js'

export const makeCreateRoomService = () => {
  return new CreateRoomService(new RoomDatabase())
}
