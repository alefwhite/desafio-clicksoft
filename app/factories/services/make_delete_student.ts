import { DeleteStudentService } from '#services/student/delete_student'
import { UserDatabase } from '../../repositories/users.js'

export const makeDeleteStudentService = () => {
  return new DeleteStudentService(new UserDatabase())
}
