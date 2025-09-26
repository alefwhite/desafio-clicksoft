import ErrorEmailAlreadyExists from '#exceptions/error_email_already_exists'
import User, { UserType } from '#models/user'
import { UserRepository } from '../repositories/users.js'

interface CreateTeacherDTO {
  name: string
  email: string
  password: string
  dateOfBirth: string
  registrationNumber: number
}

export class CreateTeacherUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(data: CreateTeacherDTO): Promise<void> {
    const existingUserByEmail = await this.userRepository.findByEmail(data.email)

    if (existingUserByEmail) {
      throw new ErrorEmailAlreadyExists()
    }

    const user = new User()

    user.merge({
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      registrationNumber: data.registrationNumber,
      userType: UserType.TEACHER,
    })

    await this.userRepository.create(user)
  }
}
