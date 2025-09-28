import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'room_number' })
  declare roomNumber: number

  @column()
  declare capacity: number

  @column({ columnName: 'created_by' })
  declare createdBy: string

  @column()
  declare disponibility: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relação: Room belongs to User (professor)
  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare teacher: BelongsTo<typeof User>

  // Relação: Room many-to-many with Users (estudantes)
  @manyToMany(() => User, {
    pivotTable: 'rooms_users',
    localKey: 'id',
    pivotForeignKey: 'room_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  declare students: ManyToMany<typeof User>
}
