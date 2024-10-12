import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import User from '#models/user'
import fs from 'fs'

export default class UsersController {
  async picture({ request, response }: HttpContext) {
    const file = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif'],
    })
    if (!file) {
      return response.badRequest({ message: 'No file uploaded' })
    }
    const fileName = `${cuid()}.${file.extname}`
    try {
      await file.move('./public/assets', {
        name: fileName,
        overwrite: true,
      })
      const userId = request.input('userId')
      const user = await User.findOrFail(userId)
      if (user.profile?.picture) {
        const oldPicturePath = `./public/${user.profile.picture}`

        if (fs.existsSync(oldPicturePath)) {
          fs.unlinkSync(oldPicturePath)
          console.log('Old picture deleted:', oldPicturePath)
        } else {
          console.warn('Old picture not found:', oldPicturePath)
        }
      }

      if (!user.profile) {
        user.profile = {}
      }
      ;(user.profile as Record<string, unknown>)['picture'] = `assets/${file.fileName}`
      await user.save()
      return response.ok({
        message: 'File uploaded successfully',
        fileName: file.fileName,
        filePath: `assets/${file.fileName}`,
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
    console.log(newSettings)
    user.profile = user.profile ?? {}
    user.profile.settings = newSettings
    console.log(user)
    await user.save()
    return response.ok(user)
  }
}
