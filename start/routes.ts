/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/health-check', async () => {
  return {
    checked: true,
  }
})

// Teachers
const TeacherController = () => import('#controllers/teacher_controller')

router.post('/teachers', [TeacherController, 'store'])
