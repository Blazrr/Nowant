import Participation from '#models/participation'
import { createParticipationValidator } from '#validators/participation'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

export default class ParticipationsController {
  async create({ request, response }: HttpContext) {
    const { lobbyId, userId, agent, spell, timer, x, y } = await request.validateUsing(
      createParticipationValidator
    )
    const participation = await Participation.create({ lobbyId, userId, agent, spell, timer, x, y })
    emitter.emit('new_participation', { id: lobbyId })
    return response.ok(participation)
  }

  async delete({ params, response }: HttpContext) {
    const participation = await Participation.findOrFail(params.id)
    await participation.delete()
    emitter.emit('new_participation', { id: participation.lobbyId })
    return response.ok(participation)
  }
}
