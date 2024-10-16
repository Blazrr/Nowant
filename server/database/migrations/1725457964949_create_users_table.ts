import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table
        .jsonb('profile')
        .nullable()
        .defaultTo({
          picture:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          settings: { mapSize: 1.2, mapZoom: 1, showMap: true },
        })

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
