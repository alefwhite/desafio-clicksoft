import ForbiddenException from '#exceptions/forbidden'
import RoomNotFoundException from '#exceptions/room_not_found'
import { RoomRepository } from '../../repositories/room.js'

export class DeleteRoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  public async execute(roomId: string, createdBy: string): Promise<void> {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new RoomNotFoundException()
    }

    if (room.createdBy !== createdBy) {
      throw new ForbiddenException()
    }

    await this.roomRepository.delete(roomId)
  }
}
