import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const LobbiesController = () => import('#controllers/lobbies_controller')
const ParticipationsController = () => import('#controllers/participations_controller')

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
    router.get('dataByToken', [AuthController, 'dataByToken']).use(middleware.auth())
  })
  .prefix('/auth')

router
  .group(() => {
    router.post('create', [LobbiesController, 'create']).use(middleware.auth())
    router.get('getAll', [LobbiesController, 'getAll']).use(middleware.auth())
    router.get('getOne/:id', [LobbiesController, 'getOne']).use(middleware.auth())
  })
  .prefix('/lobbies')

router
  .group(() => {
    router.post('create', [ParticipationsController, 'create']).use(middleware.auth())
    router.delete('delete/:id', [ParticipationsController, 'delete']).use(middleware.auth())
  })
  .prefix('/participations')
