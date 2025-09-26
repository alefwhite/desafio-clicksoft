import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Chave estrangeira para users
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      // Chave estrangeira para rooms
      table.uuid('room_id').notNullable().references('id').inTable('rooms').onDelete('CASCADE')

      // Índice único para evitar duplicatas
      table.unique(['user_id', 'room_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
