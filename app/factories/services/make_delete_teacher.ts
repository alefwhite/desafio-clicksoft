import { DeleteTeacherService } from '#services/delete_teacher'
import { UserDatabase } from '../../repositories/users.js'

export const makeDeleteTeacherService = () => {
  return new DeleteTeacherService(new UserDatabase())
}
