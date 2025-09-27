import { UpdateRoomService } from '#services/update_room'
import { RoomDatabase } from '../../repositories/room.js'

export const makeUpdateRoomService = () => {
  return new UpdateRoomService(new RoomDatabase())
}
