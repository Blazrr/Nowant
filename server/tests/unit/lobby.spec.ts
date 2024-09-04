import Lobby from '#models/lobby'
import { test } from '@japa/runner'

test.group('Lobby', () => {
  test('create lobby', async ({}) => {
    const lobby = new Lobby()
    lobby.name = 'Lobby de sami'
    lobby.map = 'Bind'
    lobby.userId = 1

    await lobby.save()
  })
})
