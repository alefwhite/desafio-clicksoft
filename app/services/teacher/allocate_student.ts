import ForbiddenException from '#exceptions/forbidden'
import RoomNotFoundException from '#exceptions/room_not_found'
import UserNotFoundException from '#exceptions/user_not_found'
import { UserType } from '#models/user'
import { RoomRepository } from '../../repositories/room.js'
import { UserRepository } from '../../repositories/users.js'

interface AllocateStudentDTO {
  teacherId: string
  studentId: string
  roomId: string
}

export class AllocateStudentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  async execute({ teacherId, studentId, roomId }: AllocateStudentDTO): Promise<void> {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new RoomNotFoundException()
    }

    if (room.createdBy !== teacherId) {
      throw new ForbiddenException('Você não pode alocar estudantes em salas que não criou.')
    }

    const student = await this.userRepository.findById(studentId)

    if (!student) {
      throw new UserNotFoundException('Estudante não encontrado.')
    }

    if (student.userType !== UserType.STUDENT) {
      throw new ForbiddenException('Usuário não é um estudante.')
    }

    await this.userRepository.allocateRoomToStudent(roomId, studentId)
  }
}
