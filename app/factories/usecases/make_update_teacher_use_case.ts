import { UserDatabase } from '../../repositories/users.js'
import { UpdateTeacherUseCase } from '../../usecases/update_teacher.js'

export const makeUpdateTeacherUseCase = () => {
  return new UpdateTeacherUseCase(new UserDatabase())
}
