import app from '@adonisjs/core/services/app'
import Ws from '#services/Ws'
import emitter from '@adonisjs/core/services/emitter'
app.ready(() => {
  Ws.boot()
  const io = Ws.io
  io?.on('connection', (socket) => {
    console.log(socket.id)
  })
  emitter.on('new_participation', async (params) => {
    try {
      Ws.io?.emit(`new_participation_${params.id}`)
    } catch (error) {
      console.error('Error:', error.message)
    }
  })
  emitter.on('start_lobby', async (id) => {
    try {
      Ws.io?.emit(`start_lobby_${id}`)
    } catch (error) {
      console.error('Error:', error.message)
    }
  })
})
