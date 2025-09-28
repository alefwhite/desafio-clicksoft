import Room from '#models/room'

export interface RoomRepository {
  create(data: Room): Promise<void>
  findById(id: string): Promise<Room | null>
  findByRoomNumberAndCreatedBy(roomNumber: number, createdBy: string): Promise<Room | null>
  update(
    id: string,
    data: { roomNumber: number; capacity: number; disponibility: boolean }
  ): Promise<void>
  delete(id: string): Promise<void>
  findByIdWithStudents(id: string): Promise<Room | null>
  findStudentsInRoom(data: { createdBy: string; roomId: string }): Promise<Room[]>
}

export class RoomDatabase implements RoomRepository {
  public async create(data: Room): Promise<void> {
    await Room.create(data)
  }

  public async findById(id: string): Promise<Room | null> {
    const room = await Room.find(id)
    return room
  }

  public async findByIdWithStudents(id: string): Promise<Room | null> {
    const room = await Room.query().where('id', id).preload('students').first()
    return room
  }

  public async update(
    id: string,
    data: { roomNumber: number; capacity: number; disponibility: boolean }
  ): Promise<void> {
    await Room.query().where('id', id).update({
      room_number: data.roomNumber,
      capacity: data.capacity,
      disponibility: data.disponibility,
    })
  }

  public async delete(id: string): Promise<void> {
    await Room.query().where('id', id).delete()
  }

  public async findByRoomNumberAndCreatedBy(
    roomNumber: number,
    createdBy: string
  ): Promise<Room | null> {
    const room = await Room.query()
      .where('room_number', roomNumber)
      .andWhere('created_by', createdBy)
      .first()
    return room
  }

  public async findStudentsInRoom(data: { createdBy: string; roomId: string }): Promise<Room[]> {
    const rooms = await Room.query()
      .where('created_by', data.createdBy)
      .andWhere('id', data.roomId)
      .preload('students')
    return rooms
  }
}
