import { UserType } from '#models/user'
import vine from '@vinejs/vine'

export const roomValidator = vine.compile(
  vine.object({
    roomNumber: vine.number().min(1),
    capacity: vine.number().min(1),
    createdBy: vine.string().uuid(),
    disponibility: vine.boolean(),
    userType: vine.enum([UserType.TEACHER]),
  })
)

export const updateRoomValidator = vine.compile(
  vine.object({
    roomNumber: vine.number().min(1).optional(),
    capacity: vine.number().min(1).optional(),
    disponibility: vine.boolean().optional(),
    createdBy: vine.string().uuid(),
  })
)
