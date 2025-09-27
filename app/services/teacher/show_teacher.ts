import ForbiddenException from '#exceptions/forbidden'
import UserNotFoundException from '#exceptions/user_not_found'
import User from '#models/user'
import { UserRepository } from '../../repositories/users.js'

export class ShowTeacherService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, teacherId: string): Promise<User> {
    const teacher = await this.userRepository.findById(id)

    if (!teacher) {
      throw new UserNotFoundException()
    }

    if (teacherId !== teacher.id) {
      throw new ForbiddenException()
    }

    return teacher
  }
}
