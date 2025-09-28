import ForbiddenException from '#exceptions/forbidden'
import UserNotFoundException from '#exceptions/user_not_found'
import User from '#models/user'
import { UserRepository } from '../../repositories/users.js'

export class ShowStudentService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, studentId: string): Promise<User> {
    const student = await this.userRepository.findById(id)

    if (!student) {
      throw new UserNotFoundException()
    }

    if (studentId !== student.id) {
      throw new ForbiddenException()
    }

    await student.load('enrolledRooms')

    return student
  }
}
