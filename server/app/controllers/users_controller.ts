import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import User from '#models/user'

export default class UsersController {
  async picture({ request, response }: HttpContext) {
    const file = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif'],
    })

    const fileName = `${cuid()}.${file!.extname}`

    try {
      await file!.move('./public/assets', {
        name: fileName,
        overwrite: true,
      })

      const user = await User.findOrFail(request.all().userId)
      ;(user.profile as Record<string, unknown>)['picture'] = `/uploads/${file!.fileName}`

      await user.save()
      return response.ok({
        message: 'File uploaded successfully',
        fileName: file!.fileName,
        filePath: `/uploads/${file!.fileName}`,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'File upload failed',
        error: error.message,
      })
    }
  }
}
