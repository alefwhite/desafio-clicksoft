import { CreateStudentService } from '#services/student/create_student'
import { UserDatabase } from '../../repositories/users.js'

export const makeCreateStudentService = () => {
  return new CreateStudentService(new UserDatabase())
}
