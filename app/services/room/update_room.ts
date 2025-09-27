import ForbiddenException from '#exceptions/forbidden'
import RoomNotFoundException from '#exceptions/room_not_found'
import { RoomRepository } from '../../repositories/room.js'

interface UpdateRoomDTO {
  roomId: string
  createdBy: string
  roomNumber?: number
  capacity?: number
  disponibility?: boolean
}

export class UpdateRoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  public async execute({ roomId, createdBy, ...data }: UpdateRoomDTO): Promise<void> {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new RoomNotFoundException()
    }

    if (room.createdBy !== createdBy) {
      throw new ForbiddenException()
    }

    await this.roomRepository.update(roomId, {
      roomNumber: data.roomNumber ?? room.roomNumber,
      capacity: data.capacity ?? room.capacity,
      disponibility: data.disponibility ?? room.disponibility,
    })
  }
}
