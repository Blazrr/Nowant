import vine from '@vinejs/vine'

export const createParticipationValidator = vine.compile(
  vine.object({
    lobbyId: vine.number(),
    userId: vine.number(),
    agent: vine.string().minLength(3).maxLength(20),
    spell: vine.string().minLength(3).maxLength(20),
    timer: vine.number(),
    x: vine.number(),
    y: vine.number(),
  })
)
