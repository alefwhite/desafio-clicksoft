import { DeleteTeacherService } from '#services/teacher/delete_teacher'
import { UserDatabase } from '../../repositories/users.js'

export const makeDeleteTeacherService = () => {
  return new DeleteTeacherService(new UserDatabase())
}
