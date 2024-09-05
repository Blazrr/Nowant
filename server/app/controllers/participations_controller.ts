import Participation from '#models/participation'
import { createParticipationValidator } from '#validators/participation'
import type { HttpContext } from '@adonisjs/core/http'

export default class ParticipationsController {
  async create({ request, response }: HttpContext) {
    const { lobbyId, userId, agent, spell, timer, x, y } = await request.validateUsing(
      createParticipationValidator
    )
    const participation = await Participation.create({ lobbyId, userId, agent, spell, timer, x, y })
    return response.ok(participation)
  }

  async delete({ params, response }: HttpContext) {
    const participation = await Participation.findOrFail(params.id)
    await participation.delete()
    return response.ok(participation)
  }
}
