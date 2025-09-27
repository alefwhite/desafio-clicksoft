import EmailAlreadyExistsException from '#exceptions/email_already_exists'
import ForbiddenException from '#exceptions/forbidden'
import UserNotFoundException from '#exceptions/user_not_found'
import { UserRepository } from '../../repositories/users.js'

interface UpdateTeacherDTO {
  id: string
  teacherId: string
  name?: string
  email?: string
  dateOfBirth?: Date
  registrationNumber?: number
}

export class UpdateTeacherService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id, teacherId, ...data }: UpdateTeacherDTO): Promise<void> {
    const teacher = await this.userRepository.findById(id)

    if (!teacher) {
      throw new UserNotFoundException()
    }

    if (teacherId !== teacher.id) {
      throw new ForbiddenException()
    }

    if (data.email && data.email !== teacher.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(data.email)

      if (userWithSameEmail) {
        throw new EmailAlreadyExistsException()
      }
    }

    await this.userRepository.update(id, {
      name: data.name ?? teacher.name,
      email: data.email ?? teacher.email,
      dateOfBirth: data.dateOfBirth ?? teacher.dateOfBirth.toJSDate(),
      registrationNumber: data.registrationNumber ?? teacher.registrationNumber,
    })
  }
}
