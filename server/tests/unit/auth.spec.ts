import User from '#models/user'
import { test } from '@japa/runner'
import hash from '@adonisjs/core/services/hash'


test.group('Auth', () => {
  test('register test', async ({ assert }) => {
    const user = new User()
    user.username = 'sami'
    user.email = 'mail-test@gmail.fr'
    user.password = 'Password123!'

    
    await user.save()
    
    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, 'Password123!'))
  })

  test('login test', async ({ assert }) => {
    const user = await User.findBy('username', 'sami')
    assert.isNotNull(user)
    const validatePassword = await hash.verify(user!.password, 'Password123!')
    assert.isTrue(validatePassword)

  })
})