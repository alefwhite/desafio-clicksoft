import { AllocateStudentService } from '#services/teacher/allocate_student'
import { RoomDatabase } from '../../repositories/room.js'
import { UserDatabase } from '../../repositories/users.js'

export const makeAllocateStudentService = () => {
  return new AllocateStudentService(new UserDatabase(), new RoomDatabase())
}
