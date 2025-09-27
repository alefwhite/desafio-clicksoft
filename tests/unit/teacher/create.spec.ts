import User, { UserType } from '#models/user'
import { CreateTeacherService } from '#services/create_teacher'
import { test } from '@japa/runner'
import { UserRepository } from '../../../app/repositories/users.js'
import { DateTime } from 'luxon'
import EmailAlreadyExistsException from '#exceptions/email_already_exists'
import RegistrationNumberAlreadyExistsException from '#exceptions/registration_number_already_exists'

test.group('Teacher create', () => {
  // Mock global do UserRepository
  let mockUserRepository: UserRepository
  let methodCalls: string[]

  // Helper para criar dados de teste padrão
  const createTeacherData = (override = {}) => ({
    name: 'Teacher Name',
    email: 'teacher@example.com',
    password: 'password123',
    dateOfBirth: new Date('1990-01-01'),
    registrationNumber: 123456,
    ...override,
  })

  // Helper para resetar mocks antes de cada teste
  const resetMocks = () => {
    methodCalls = []

    mockUserRepository = {
      create: async (user: User) => {
        methodCalls.push('create')
        return user
      },
      findByEmail: async () => {
        methodCalls.push('findByEmail')
        return null // Por padrão, não encontra usuário
      },
      findByRegistrationNumber: async () => {
        methodCalls.push('findByRegistrationNumber')
        return null // Por padrão, não encontra usuário
      },
      findById: async () => Promise.resolve(null),
      update: async () => Promise.resolve(),
      delete: async () => Promise.resolve(),
    }
  }
  test('should create a teacher successfully', async ({ assert }) => {
    // Arrange
    resetMocks()

    // Sobrescreve o método create para fazer verificações específicas
    mockUserRepository.create = async (user: User) => {
      assert.equal(user.name, 'Teacher Name')
      assert.equal(user.email, 'teacher@example.com')
      assert.equal(user.registrationNumber, 123456)
      assert.equal(user.userType, UserType.TEACHER)
      assert.isTrue(DateTime.isDateTime(user.dateOfBirth))
      return user
    }

    const sut = new CreateTeacherService(mockUserRepository)
    const teacherData = createTeacherData()

    // Act & Assert
    await sut.execute(teacherData)
  })

  test('should throw EmailAlreadyExistsException when email already exists', async ({ assert }) => {
    // Arrange
    resetMocks()

    const existingUser = new User()
    existingUser.merge({
      id: 'existing-id',
      email: 'teacher@example.com',
      userType: UserType.TEACHER,
    })

    // Sobrescreve o método findByEmail para retornar usuário existente
    mockUserRepository.findByEmail = async () => Promise.resolve(existingUser)

    const sut = new CreateTeacherService(mockUserRepository)
    const teacherData = createTeacherData()

    // Act & Assert
    try {
      await sut.execute(teacherData)
      assert.fail('Should have thrown EmailAlreadyExistsException')
    } catch (error) {
      assert.instanceOf(error, EmailAlreadyExistsException)
      assert.equal((error as EmailAlreadyExistsException).message, 'Email já cadastrado.')
    }
  })

  test('should throw RegistrationNumberAlreadyExistsException when registration number already exists', async ({
    assert,
  }) => {
    // Arrange
    resetMocks()

    const existingUser = new User()
    existingUser.merge({
      id: 'existing-id',
      registrationNumber: 123456,
      userType: UserType.TEACHER,
    })

    // Sobrescreve o método findByRegistrationNumber para retornar usuário existente
    mockUserRepository.findByRegistrationNumber = async () => Promise.resolve(existingUser)

    const sut = new CreateTeacherService(mockUserRepository)
    const teacherData = createTeacherData()

    // Act & Assert
    try {
      await sut.execute(teacherData)
      assert.fail('Should have thrown RegistrationNumberAlreadyExistsException')
    } catch (error) {
      assert.instanceOf(error, RegistrationNumberAlreadyExistsException)
    }
  })

  test('should call UserRepository methods in correct order', async ({ assert }) => {
    // Arrange
    resetMocks()

    // Sobrescreve métodos para verificar parâmetros
    mockUserRepository.findByEmail = async (email: string) => {
      methodCalls.push('findByEmail')
      assert.equal(email, 'teacher@example.com')
      return null
    }

    mockUserRepository.findByRegistrationNumber = async (registrationNumber: number) => {
      methodCalls.push('findByRegistrationNumber')
      assert.equal(registrationNumber, 123456)
      return null
    }

    const sut = new CreateTeacherService(mockUserRepository)
    const teacherData = createTeacherData()

    // Act
    await sut.execute(teacherData)

    // Assert
    assert.deepEqual(methodCalls, ['findByEmail', 'findByRegistrationNumber', 'create'])
  })
})
