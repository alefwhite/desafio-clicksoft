import type { HttpContext } from '@adonisjs/core/http'
import { makeCreateRoomService } from '../factories/services/make_create_room.js'
import { roomValidator, updateRoomValidator } from '#validators/room'
import { makeDeleteRoomService } from '../factories/services/make_delete_room.js'
import { makeUpdateRoomService } from '../factories/services/make_update_room.js'
import { makeListStudentsInTheRoomService } from '../factories/services/make_list_students_in_the_room.js'

export default class RoomsController {
  async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const body = request.body()

    const payload = await roomValidator.validate({
      ...body,
      createdBy: user.id,
      userType: user.userType,
    })

    const createRoomService = makeCreateRoomService()

    await createRoomService.execute(payload)

    return response.status(201).json({ message: 'Sala criada com sucesso.' })
  }

  async update({ request, response, auth, params }: HttpContext) {
    const { id: roomId } = params

    const user = auth.getUserOrFail()

    const body = request.body()

    const payload = await updateRoomValidator.validate({
      ...body,
      createdBy: user.id,
    })

    const updateRoomService = makeUpdateRoomService()

    await updateRoomService.execute({
      roomId,
      ...payload,
    })

    return response.status(200).json({ message: 'Sala atualizada com sucesso.' })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const { id } = params
    const user = auth.getUserOrFail()

    const deleteRoomService = makeDeleteRoomService()

    await deleteRoomService.execute(id, user.id)

    return response.status(200).noContent()
  }

  async listStudentsInRoom({ auth, params, response }: HttpContext) {
    const { id: roomId } = params
    const teacher = auth.getUserOrFail()

    const listStudentsService = makeListStudentsInTheRoomService()

    const students = await listStudentsService.execute({
      roomId,
      createdBy: teacher.id,
    })

    return response.status(200).json(students)
  }
}
