import { UserDatabase } from '../../repositories/users.js'
import { CreateTeacherUseCase } from '../../usecases/create_teacher.js'

export const makeCreateTeacherUseCase = () => {
  return new CreateTeacherUseCase(new UserDatabase())
}
