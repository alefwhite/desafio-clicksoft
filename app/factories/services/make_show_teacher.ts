import { UserDatabase } from '../../repositories/users.js'
import { ShowTeacherService } from '#services/show_teacher'

export const makeShowTeacherService = () => {
  return new ShowTeacherService(new UserDatabase())
}
