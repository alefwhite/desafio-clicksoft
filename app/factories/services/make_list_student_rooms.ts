import { ListStudentRoomsService } from '#services/student/list_student_rooms'
import { UserDatabase } from '../../repositories/users.js'

export const makeListStudentRoomsService = () => {
  return new ListStudentRoomsService(new UserDatabase())
}
