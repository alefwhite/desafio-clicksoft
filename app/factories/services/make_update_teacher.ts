import { UserDatabase } from '../../repositories/users.js'
import { UpdateTeacherService } from '#services/teacher/update_teacher'

export const makeUpdateTeacherService = () => {
  return new UpdateTeacherService(new UserDatabase())
}
