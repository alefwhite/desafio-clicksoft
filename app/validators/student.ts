import vine from '@vinejs/vine'

export const studentValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100).trim(),
    email: vine.string().email().trim(),
    password: vine.string().minLength(6).maxLength(100),
    dateOfBirth: vine.date({
      formats: ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD HH:mm:ss'],
    }),
    registrationNumber: vine.number().min(1),
  })
)

export const updateStudentValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100).trim().optional(),
    email: vine.string().email().trim().optional(),
    dateOfBirth: vine
      .date({
        formats: ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD HH:mm:ss'],
      })
      .optional(),
    registrationNumber: vine.number().min(1).optional(),
  })
)
