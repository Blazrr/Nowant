import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'

export default class UsersController {
  async picture({ request, response, params }: HttpContext) {
    const { id } = params
    console.log(id)
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
