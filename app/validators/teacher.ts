import vine from '@vinejs/vine'

export const teacherValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100).trim(),
    email: vine.string().email().trim(),
    password: vine.string().minLength(6).maxLength(100),
    dateOfBirth: vine.date(),
    registrationNumber: vine.number().min(1),
  })
)
