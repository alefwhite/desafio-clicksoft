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

// Sessions
const SessionController = () => import('#controllers/session_controller')

router.post('session', [SessionController, 'store'])
router.delete('session', [SessionController, 'destroy']).use(middleware.auth({ guards: ['api'] }))

// Teachers
const TeacherController = () => import('#controllers/teacher_controller')

router.post('/teachers', [TeacherController, 'store'])
router.get('/teachers/:id', [TeacherController, 'show']).use(middleware.auth({ guards: ['api'] }))
router.put('/teachers/:id', [TeacherController, 'update']).use(middleware.auth({ guards: ['api'] }))
router
  .delete('/teachers/:id', [TeacherController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

// Students
const StudentController = () => import('#controllers/student_controller')

router.post('/students', [StudentController, 'store'])
router.get('/students/:id', [StudentController, 'show']).use(middleware.auth({ guards: ['api'] }))
router.put('/students/:id', [StudentController, 'update']).use(middleware.auth({ guards: ['api'] }))
router
  .delete('/students/:id', [StudentController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

// My Rooms - Minhas salas (para o estudante logado)
router.get('/my-rooms', [StudentController, 'myRooms']).use(middleware.auth({ guards: ['api'] }))

// Rooms
const RoomController = () => import('#controllers/room_controller')

router.post('/rooms', [RoomController, 'store']).use(middleware.auth({ guards: ['api'] }))
router.put('/rooms/:id', [RoomController, 'update']).use(middleware.auth({ guards: ['api'] }))
router.delete('/rooms/:id', [RoomController, 'destroy']).use(middleware.auth({ guards: ['api'] }))
