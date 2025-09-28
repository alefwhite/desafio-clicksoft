import UserNotFoundException from '#exceptions/user_not_found'
import { UserRepository } from '../../repositories/users.js'

interface StudentRoomInfo {
  teacherName: string
  roomNumber: number
}

interface StudentRoomsResponse {
  name: string
  enrolledRooms: StudentRoomInfo[]
}

export class ListStudentRoomsService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(studentId: string): Promise<StudentRoomsResponse> {
    const student = await this.userRepository.findMyEnrolledRooms(studentId)

    if (!student) {
      throw new UserNotFoundException()
    }

    return student
  }
}
