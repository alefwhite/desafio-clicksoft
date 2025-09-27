import EmailAlreadyExistsException from '#exceptions/email_already_exists'
import RegistrationNumberAlreadyExistsException from '#exceptions/registration_number_already_exists'
import User, { UserType } from '#models/user'
import { UserRepository } from '../../repositories/users.js'
import { DateTime } from 'luxon'

interface CreateTeacherDTO {
  name: string
  email: string
  password: string
  dateOfBirth: Date
  registrationNumber: number
}

export class CreateTeacherService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(data: CreateTeacherDTO): Promise<void> {
    const existingUserByEmail = await this.userRepository.findByEmail(data.email)

    if (existingUserByEmail) {
      throw new EmailAlreadyExistsException()
    }

    const existingUserByRegistrationNumber = await this.userRepository.findByRegistrationNumber(
      data.registrationNumber
    )

    if (existingUserByRegistrationNumber) {
      throw new RegistrationNumberAlreadyExistsException()
    }

    const user = new User()

    user.merge({
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: DateTime.fromJSDate(data.dateOfBirth),
      registrationNumber: data.registrationNumber,
      userType: UserType.TEACHER,
    })

    await this.userRepository.create(user)
  }
}
