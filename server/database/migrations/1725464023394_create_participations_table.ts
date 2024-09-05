import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'participations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('lobby_id').unsigned().references('lobbies.id').onDelete('CASCADE')
      table.string('agent').notNullable()
      table.string('spell').notNullable()
      table.float('timer').notNullable()
      table.float('x').notNullable()
      table.float('y').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
