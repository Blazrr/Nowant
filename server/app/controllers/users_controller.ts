import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import User from '#models/user'

export default class UsersController {
  async picture({ request, response }: HttpContext) {
    try {
      const file = request.file('file', {
        size: '2mb',
        extnames: ['jpg', 'jpeg', 'png', 'gif'],
      })
      if (!file) {
        return response.badRequest({ message: 'No file uploaded' })
      }
      const fileName = `${cuid()}.${file.extname}`
      console.log('Moving file to S3')
      await file.moveToDisk(fileName, 's3', {
        contentType: 'image/png',
      })

      const userId = request.input('userId')
      const user = await User.findOrFail(userId)

      ;(user.profile as Record<string, unknown>)['picture'] = fileName
      await user.save()
      return response.ok({
        message: 'File uploaded successfully',
        // fileName: file.fileName,
        // filePath: `assets/${file.fileName}`,
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      return response.internalServerError({
        message: 'File upload failed',
        error: error.message,
      })
    }
  }

  async settings({ request, response }: HttpContext) {
    const { userId, ...newSettings } = request.all()
    const user = await User.findOrFail(userId)
    user.profile = user.profile ?? {}
    user.profile.settings = newSettings
    await user.save()
    return response.ok(user)
  }
}
