import type { HttpContext } from '@adonisjs/core/http'
import { makeCreateRoomService } from '../factories/services/make_create_room.js'
import { roomValidator } from '#validators/room'

export default class RoomsController {
  async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const body = request.body()

    const payload = await roomValidator.validate({
      ...body,
      createdBy: user.id,
      userType: user.userType,
    })

    const roomService = makeCreateRoomService()

    await roomService.execute(payload)

    return response.status(201).json({ message: 'Sala criada com sucesso.' })
  }
}
