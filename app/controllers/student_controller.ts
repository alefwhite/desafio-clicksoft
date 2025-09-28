import type { HttpContext } from '@adonisjs/core/http'
import { studentValidator, updateStudentValidator } from '#validators/student'
import { makeUpdateStudentService } from '../factories/services/make_update_student.js'
import { makeDeleteStudentService } from '../factories/services/make_delete_student.js'
import { makeCreateStudentService } from '../factories/services/make_create_student.js'
import { makeShowStudentService } from '../factories/services/make_show_student.js'
import { makeListStudentRoomsService } from '../factories/services/make_list_student_rooms.js'

export default class StudentController {
  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const payload = await studentValidator.validate(body)

    const createStudentService = makeCreateStudentService()

    await createStudentService.execute({
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
    const student = auth.getUserOrFail()

    const showStudentService = makeShowStudentService()

    const user = await showStudentService.execute(id, student.id)

    return response.status(200).json(user)
  }

  public async update({ auth, params, request, response }: HttpContext) {
    const { id } = params
    const body = request.body()

    const payload = await updateStudentValidator.validate(body)
    const student = auth.getUserOrFail()

    const updateStudentService = makeUpdateStudentService()

    await updateStudentService.execute({
      id,
      studentId: student.id,
      name: payload.name,
      email: payload.email,
      dateOfBirth: payload.dateOfBirth,
      registrationNumber: payload.registrationNumber,
    })

    return response.status(200).noContent()
  }

  public async destroy({ auth, params, response }: HttpContext) {
    const { id } = params
    const student = auth.getUserOrFail()

    const deleteStudentService = makeDeleteStudentService()

    await deleteStudentService.execute(id, student.id)

    return response.status(200).noContent()
  }

  public async myRooms({ auth, response }: HttpContext) {
    const student = auth.getUserOrFail()

    const listStudentRoomsService = makeListStudentRoomsService()

    const user = await listStudentRoomsService.execute(student.id)

    return response.status(200).json(user)
  }
}
