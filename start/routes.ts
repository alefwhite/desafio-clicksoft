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
router.put('/teachers/:id', [TeacherController, 'update']).use(middleware.auth({ guards: ['api'] }))
router
  .delete('/teachers/:id', [TeacherController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

// Sessions
const SessionController = () => import('#controllers/session_controller')

router.post('session', [SessionController, 'store'])
router.delete('session', [SessionController, 'destroy']).use(middleware.auth({ guards: ['api'] }))
