import type { HttpContext } from '@adonisjs/core/http'
import { makeCreateTeacherUseCase } from '../factories/usecases/make_create_teacher_use_case.js'
import { teacherValidator } from '#validators/teacher'

export default class TeacherController {
  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const payload = await teacherValidator.validate(body)

    const createTeacherUseCase = makeCreateTeacherUseCase()

    const user = await createTeacherUseCase.execute({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      dateOfBirth: payload.dateOfBirth.toLocaleDateString(),
      registrationNumber: payload.registrationNumber,
    })

    return response.status(201).json(user)
  }
}
