import ForbiddenException from '#exceptions/forbidden'
import UserNotFoundException from '#exceptions/user_not_found'
import { UserRepository } from '../../repositories/users.js'

export class DeleteTeacherService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, teacherId: string): Promise<void> {
    const teacher = await this.userRepository.findById(id)

    if (!teacher) {
      throw new UserNotFoundException()
    }

    if (teacherId !== teacher.id) {
      throw new ForbiddenException()
    }

    await this.userRepository.delete(id)
  }
}
