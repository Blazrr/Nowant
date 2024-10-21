import Lobby from '#models/lobby'
import { createLobbyValidator } from '#validators/lobby'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

export default class LobbiesController {
  async create({ request, response }: HttpContext) {
    const { name, map, password, userId } = await request.validateUsing(createLobbyValidator)
    const lobby = await Lobby.create({ name, map, password: password!, userId })
    return response.ok(lobby)
  }

  async getAll({ response }: HttpContext) {
    const lobbies = await Lobby.query()
      .preload('user')
      .preload('participations', (query) => {
        query.preload('user')
      })

    return response.ok(lobbies)
  }

  async getOne({ params, response }: HttpContext) {
    const lobby = await Lobby.query()
      .where('id', params.id)
      .preload('user')
      .preload('participations', (query) => {
        query.preload('user')
      })
      .first()
    return response.ok(lobby)
  }

  async delete({ params, response }: HttpContext) {
    const lobby = await Lobby.findOrFail(params.id)
    await lobby.load('participations')
    for (const participation of lobby?.participations) {
      await participation.delete()
    }
    await lobby.delete()
    return response.ok(lobby)
  }

  async startLobby({ request, response }: HttpContext) {
    try {
      const lobbyId = request.input('lobby_id')
      console.log('Starting game for lobby:', lobbyId)
      await emitter.emit('start_lobby', lobbyId)
      return 1
    } catch (error) {
      console.error('Error starting game:', error)
      return response.internalServerError('Could not start game')
    }
  }
}
