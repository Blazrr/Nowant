import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Lobby from './lobby.js'

export default class Participation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @column()
  declare lobbyId: number

  @belongsTo(() => Lobby, {
    foreignKey: 'lobbyId',
  })
  declare lobby: BelongsTo<typeof Lobby>

  @column()
  declare agent: string

  @column()
  declare spell: string

  @column()
  declare timer: number

  @column()
  declare x: number

  @column()
  declare y: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
