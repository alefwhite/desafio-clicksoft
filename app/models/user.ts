import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeCreate, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Room from './room.js'

export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = randomUUID()
  }

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column({ columnName: 'user_type' })
  declare userType: UserType

  @column.date({ columnName: 'date_of_birth' })
  declare dateOfBirth: DateTime

  @column({ columnName: 'registration_number' })
  declare registrationNumber: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Room, {
    foreignKey: 'createdBy',
  })
  declare rooms: HasMany<typeof Room>

  // Relação: User many-to-many with Rooms (para estudantes)
  @manyToMany(() => Room, {
    pivotTable: 'rooms_users',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'room_id',
    pivotTimestamps: true,
  })
  declare enrolledRooms: ManyToMany<any>

  // Método para customizar serialização baseado no tipo do usuário
  public serialize() {
    const data = super.serialize()

    // Se for estudante, remove a propriedade 'rooms' (que é para professores)
    if (this.userType === UserType.STUDENT) {
      delete data.rooms
    }

    // Se for professor, remove a propriedade 'enrolledRooms' (que é para estudantes)
    if (this.userType === UserType.TEACHER) {
      delete data.enrolledRooms
    }

    return data
  }

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
