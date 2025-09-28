import { ShowStudentService } from '#services/student/show_student'
import { UserDatabase } from '../../repositories/users.js'

export const makeShowStudentService = () => {
  return new ShowStudentService(new UserDatabase())
}
