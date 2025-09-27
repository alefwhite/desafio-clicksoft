import { CreateTeacherService } from '#services/teacher/create_teacher'
import { UserDatabase } from '../../repositories/users.js'

export const makeCreateTeacherService = () => {
  return new CreateTeacherService(new UserDatabase())
}
