/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/health-check', async () => {
  return {
    checked: true,
  }
})

// Teachers
const TeacherController = () => import('#controllers/teacher_controller')

router.post('/teachers', [TeacherController, 'store'])
router.get('/teachers/:id', [TeacherController, 'show']).use(middleware.auth({ guards: ['api'] }))
router.put('/teachers/:id', [TeacherController, 'update']).use(middleware.auth({ guards: ['api'] }))
router
  .delete('/teachers/:id', [TeacherController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

// Sessions
const SessionController = () => import('#controllers/session_controller')

router.post('session', [SessionController, 'store'])
router.delete('session', [SessionController, 'destroy']).use(middleware.auth({ guards: ['api'] }))

// Rooms
const RoomController = () => import('#controllers/room_controller')

router.post('/rooms', [RoomController, 'store']).use(middleware.auth({ guards: ['api'] }))
router.put('/rooms/:id', [RoomController, 'update']).use(middleware.auth({ guards: ['api'] }))
router.delete('/rooms/:id', [RoomController, 'destroy']).use(middleware.auth({ guards: ['api'] }))
