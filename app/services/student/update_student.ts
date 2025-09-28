import EmailAlreadyExistsException from '#exceptions/email_already_exists'
import ForbiddenException from '#exceptions/forbidden'
import UserNotFoundException from '#exceptions/user_not_found'
import { UserRepository } from '../../repositories/users.js'

interface UpdateStudentDTO {
  id: string
  studentId: string
  name?: string
  email?: string
  dateOfBirth?: Date
  registrationNumber?: number
}

export class UpdateStudentService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id, studentId, ...data }: UpdateStudentDTO): Promise<void> {
    const student = await this.userRepository.findById(id)

    if (!student) {
      throw new UserNotFoundException()
    }

    if (studentId !== student.id) {
      throw new ForbiddenException()
    }

    if (data.email && data.email !== student.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(data.email)

      if (userWithSameEmail) {
        throw new EmailAlreadyExistsException()
      }
    }

    await this.userRepository.update(id, {
      name: data.name ?? student.name,
      email: data.email ?? student.email,
      dateOfBirth: data.dateOfBirth ?? student.dateOfBirth.toJSDate(),
      registrationNumber: data.registrationNumber ?? student.registrationNumber,
    })
  }
}
