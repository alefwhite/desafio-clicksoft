import ForbiddenException from '#exceptions/forbidden'
import RoomNumberAlreadyExistsException from '#exceptions/room_number_already_exists'
import Room from '#models/room'
import { UserType } from '#models/user'
import { RoomRepository } from '../../repositories/room.js'

interface CreateRoomDTO {
  roomNumber: number
  capacity: number
  createdBy: string
  disponibility: boolean
  userType: UserType
}

export class CreateRoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  public async execute(data: CreateRoomDTO): Promise<void> {
    if (data.userType !== UserType.TEACHER) {
      throw new ForbiddenException()
    }

    const existingRoom = await this.roomRepository.findByRoomNumberAndCreatedBy(
      data.roomNumber,
      data.createdBy
    )

    if (existingRoom) {
      throw new RoomNumberAlreadyExistsException()
    }

    const room = new Room()
    room.roomNumber = data.roomNumber
    room.capacity = data.capacity
    room.createdBy = data.createdBy
    room.disponibility = data.disponibility

    await this.roomRepository.create(room)
  }
}
