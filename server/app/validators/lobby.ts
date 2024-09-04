import vine from '@vinejs/vine'

export const createLobbyValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(20),
    map: vine.string().minLength(3).maxLength(20),
    password: vine.string().optional(),
    userId: vine.number(),
  })
)
