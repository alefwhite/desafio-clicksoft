import { CreateRoomService } from '#services/room/create_room'
import { RoomDatabase } from '../../repositories/room.js'

export const makeCreateRoomService = () => {
  return new CreateRoomService(new RoomDatabase())
}
