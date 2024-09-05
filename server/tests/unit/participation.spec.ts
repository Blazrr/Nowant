import Participation from '#models/participation'
import { test } from '@japa/runner'

test.group('Participation', () => {
  test('create participation', async ({}) => {
    const participation = new Participation()
    participation.lobbyId = 1
    participation.userId = 1
    participation.agent = 'Jett'
    participation.spell = 'Cloudburst'
    participation.timer = 1.2
    participation.x = 10.3
    participation.y = 10.2
    await participation.save()
  })
})
