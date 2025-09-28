import UserNotFoundException from '#exceptions/user_not_found'
import User from '#models/user'

interface EnrolledRoomInfo {
  teacherName: string
  roomNumber: number
}

export interface FormattedUserWithRooms {
  name: string
  enrolledRooms: EnrolledRoomInfo[]
}

export interface UserRepository {
  create(data: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findByIdWithRooms(id: string): Promise<User | null>
  findMyEnrolledRooms(id: string): Promise<FormattedUserWithRooms | null>
  findByRegistrationNumber(registrationNumber: number): Promise<User | null>
  update(
    id: string,
    data: { name: string; email: string; dateOfBirth: Date; registrationNumber: number }
  ): Promise<void>
  delete(id: string): Promise<void>
  allocateRoomToStudent(userId: string, roomId: string): Promise<void>
}

export class UserDatabase implements UserRepository {
  public async create(data: User): Promise<void> {
    await User.create(data)
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await User.findBy('email', email)
    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = await User.find(id)
    return user
  }

  public async findByIdWithRooms(id: string): Promise<User | null> {
    const user = await User.query().where('id', id).preload('rooms').first()
    return user
  }

  public async findByRegistrationNumber(registrationNumber: number): Promise<User | null> {
    const user = await User.findBy('registration_number', registrationNumber)
    return user
  }

  public async update(
    id: string,
    data: { name: string; email: string; dateOfBirth: Date; registrationNumber: number }
  ): Promise<void> {
    await User.query().where('id', id).update({
      name: data.name,
      email: data.email,
      date_of_birth: data.dateOfBirth,
      registration_number: data.registrationNumber,
    })
  }

  public async delete(id: string): Promise<void> {
    await User.query().where('id', id).delete()
  }

  public async findMyEnrolledRooms(userId: string): Promise<FormattedUserWithRooms | null> {
    const user = await User.query()
      .select('id', 'name')
      .where({
        id: userId,
        user_type: 'student',
      })
      .preload('enrolledRooms', (roomQuery) => {
        roomQuery.preload('teacher', (teacherQuery) => {
          teacherQuery.select(['id', 'name'])
        })
      })
      .first()

    if (!user) {
      return null
    }

    const formattedRooms: EnrolledRoomInfo[] = user.enrolledRooms.map((room) => ({
      roomNumber: room.roomNumber,
      teacherName: room.teacher.name,
    }))

    return {
      name: user.name,
      enrolledRooms: formattedRooms,
    }
  }

  public async allocateRoomToStudent(userId: string, roomId: string): Promise<void> {
    const user = await User.find(userId)

    if (!user) {
      throw new UserNotFoundException('Usuário não encontrado.')
    }

    await user.related('enrolledRooms').attach([roomId])
  }
}
