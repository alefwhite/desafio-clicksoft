import type { HttpContext } from '@adonisjs/core/http'
import { makeCreateTeacherUseCase } from '../factories/usecases/make_create_teacher_use_case.js'
import { teacherValidator, updateTeacherValidator } from '#validators/teacher'
import { makeUpdateTeacherUseCase } from '../factories/usecases/make_update_teacher_use_case.js'

export default class TeacherController {
  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const payload = await teacherValidator.validate(body)

    const createTeacherUseCase = makeCreateTeacherUseCase()

    const user = await createTeacherUseCase.execute({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      dateOfBirth: payload.dateOfBirth, // Objeto Date do validator
      registrationNumber: payload.registrationNumber,
    })

    return response.status(201).json(user)
  }

  public async update({ auth, params, request, response }: HttpContext) {
    const { id } = params
    const body = request.body()

    const payload = await updateTeacherValidator.validate(body)
    const teacher = auth.getUserOrFail()

    const updateTeacherUseCase = makeUpdateTeacherUseCase()

    await updateTeacherUseCase.execute({
      id,
      teacherId: teacher.id,
      name: payload.name,
      email: payload.email,
      dateOfBirth: payload.dateOfBirth,
      registrationNumber: payload.registrationNumber,
    })

    return response.status(200).noContent()
  }
}
