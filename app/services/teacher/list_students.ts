import Room from '#models/room'
import { RoomRepository } from '../../repositories/room.js'

interface ListStudentsDTO {
  roomId: string
  createdBy: string
}

export class ListStudentsInTheRoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  public async execute({ roomId, createdBy }: ListStudentsDTO): Promise<Room[]> {
    const students = await this.roomRepository.findStudentsInRoom({
      createdBy,
      roomId,
    })

    return students
  }
}
