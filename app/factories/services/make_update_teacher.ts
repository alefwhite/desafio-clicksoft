import { UserDatabase } from '../../repositories/users.js'
import { UpdateTeacherService } from '#services/update_teacher'

export const makeUpdateTeacherService = () => {
  return new UpdateTeacherService(new UserDatabase())
}
