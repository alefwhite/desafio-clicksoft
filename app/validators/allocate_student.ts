import vine from '@vinejs/vine'

export const allocateStudent = vine.compile(
  vine.object({
    studentId: vine.string().uuid(),
    roomId: vine.string().uuid(),
  })
)
