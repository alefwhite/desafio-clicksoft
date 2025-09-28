import ForbiddenException from '#exceptions/forbidden'
import UserNotFoundException from '#exceptions/user_not_found'
import { UserRepository } from '../../repositories/users.js'

export class DeleteStudentService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, studentId: string): Promise<void> {
    const student = await this.userRepository.findById(id)

    if (!student) {
      throw new UserNotFoundException()
    }

    if (studentId !== student.id) {
      throw new ForbiddenException()
    }

    await this.userRepository.delete(id)
  }
}
