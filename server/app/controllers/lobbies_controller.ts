import Lobby from '#models/lobby'
import { createLobbyValidator } from '#validators/lobby'
import type { HttpContext } from '@adonisjs/core/http'

export default class LobbiesController {
  async create({ request, response }: HttpContext) {
    const { name, map, password, userId } = await request.validateUsing(createLobbyValidator)
    const lobby = await Lobby.create({ name, map, password: password!, userId })
    return response.ok(lobby)
  }

  async getAll({ response }: HttpContext) {
    const lobbies = await Lobby.query().preload('user')
    return response.ok(lobbies)
  }

  async getOne({ params, response }: HttpContext) {
    const lobby = await Lobby.query().where('id', params.id).preload('user')
    return response.ok(lobby)
  }
}
