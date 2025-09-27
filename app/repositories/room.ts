import Room from '#models/room'

export interface RoomRepository {
  create(data: Room): Promise<void>
  findById(id: string): Promise<Room | null>
  findByRoomNumberAndCreatedBy(roomNumber: number, createdBy: string): Promise<Room | null>
  update(id: string, data: Room): Promise<void>
  delete(id: string): Promise<void>
}

export class RoomDatabase implements RoomRepository {
  public async create(data: Room): Promise<void> {
    await Room.create(data)
  }

  public async findById(id: string): Promise<Room | null> {
    const room = await Room.find(id)
    return room
  }

  public async update(id: string, data: Room): Promise<void> {
    await Room.query().where('id', id).update(data)
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
}
