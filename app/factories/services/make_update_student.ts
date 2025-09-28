import { UpdateStudentService } from '#services/student/update_student'
import { UserDatabase } from '../../repositories/users.js'

export const makeUpdateStudentService = () => {
  return new UpdateStudentService(new UserDatabase())
}
