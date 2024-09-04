import vine from '@vinejs/vine'


export const loginValidator = vine.compile(
    vine.object({
      username: vine.string().minLength(3).maxLength(20),
      password: vine.string().minLength(8).maxLength(512).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/),
    })
  )

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(20).unique(async (query, field) => {
        const user = await query.from('users').where('username', field).first()
        return !user
        }),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(512).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/)
  })
)
