import type { HttpContext } from '@adonisjs/core/http'
import { teacherValidator, updateTeacherValidator } from '#validators/teacher'
import { makeUpdateTeacherService } from '../factories/services/make_update_teacher.js'
import { makeCreateTeacherService } from '../factories/services/make_create_teacher.js'
import { makeDeleteTeacherService } from '../factories/services/make_delete_teacher.js'
import { makeShowTeacherService } from '../factories/services/make_show_teacher.js'
import { makeAllocateStudentService } from '../factories/services/make_allocate_student.js'
import { allocateStudent } from '#validators/allocate_student'

export default class TeacherController {
  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const payload = await teacherValidator.validate(body)

    const createTeacherService = makeCreateTeacherService()

    await createTeacherService.execute({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      dateOfBirth: payload.dateOfBirth, // Objeto Date do validator
      registrationNumber: payload.registrationNumber,
    })

    return response.status(201).json({ message: 'Cadastro realizado com sucesso.' })
  }

  public async show({ auth, params, response }: HttpContext) {
    const { id } = params
    const teacher = auth.getUserOrFail()

    const showTeacherService = makeShowTeacherService()

    const user = await showTeacherService.execute(id, teacher.id)

    return response.status(200).json(user)
  }

  public async update({ auth, params, request, response }: HttpContext) {
    const { id } = params
    const body = request.body()

    const payload = await updateTeacherValidator.validate(body)
    const teacher = auth.getUserOrFail()

    const updateTeacherService = makeUpdateTeacherService()

    await updateTeacherService.execute({
      id,
      teacherId: teacher.id,
      name: payload.name,
      email: payload.email,
      dateOfBirth: payload.dateOfBirth,
      registrationNumber: payload.registrationNumber,
    })

    return response.status(200).noContent()
  }

  public async destroy({ auth, params, response }: HttpContext) {
    const { id } = params
    const teacher = auth.getUserOrFail()

    const deleteTeacherService = makeDeleteTeacherService()

    await deleteTeacherService.execute(id, teacher.id)

    return response.status(200).noContent()
  }

  public async allocateStudent({ auth, request, response }: HttpContext) {
    const teacher = auth.getUserOrFail()

    const payload = await allocateStudent.validate(request.body())

    const allocateStudentService = makeAllocateStudentService()

    await allocateStudentService.execute({
      teacherId: teacher.id,
      studentId: payload.studentId,
      roomId: payload.roomId,
    })

    return response.status(200).json({ message: 'Estudante alocado com sucesso.' })
  }
}
