import { ListStudentsInTheRoomService } from '#services/teacher/list_students'
import { RoomDatabase } from '../../repositories/room.js'

export const makeListStudentsInTheRoomService = () => {
  return new ListStudentsInTheRoomService(new RoomDatabase())
}
