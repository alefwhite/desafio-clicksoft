import { CreateTeacherService } from '#services/create_teacher'
import { UserDatabase } from '../../repositories/users.js'

export const makeCreateTeacherService = () => {
  return new CreateTeacherService(new UserDatabase())
}
