import { DeleteRoomService } from '#services/delete_room'
import { RoomDatabase } from '../../repositories/room.js'

export const makeDeleteRoomService = () => {
  return new DeleteRoomService(new RoomDatabase())
}
