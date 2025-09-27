import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

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

  // Relação: User many-to-many with Rooms (para estudantes)
  @manyToMany(() => require('./room.js').default, {
    pivotTable: 'room_user',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'roomNumber',
    pivotRelatedForeignKey: 'room_number',
    pivotTimestamps: true,
  })
  declare rooms: ManyToMany<any>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
