import vine from '@vinejs/vine'

/**
 * Validator para criação de contatos
 */
export const createContactValidator = vine.compile(
  vine.object({
    customerId: vine.number().positive(),
    nome: vine.string().trim().minLength(1).maxLength(255),
    telefone: vine.string().trim().minLength(10).maxLength(15),
    email: vine.string().trim().email().maxLength(255),
    tipo: vine.enum(['principal', 'secundario']),
  })
)

/**
 * Validator para atualização de contatos
 */
export const updateContactValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(1).maxLength(255).optional(),
    telefone: vine.string().trim().minLength(10).maxLength(15).optional(),
    email: vine.string().trim().email().maxLength(255).optional(),
    tipo: vine.enum(['principal', 'secundario']).optional(),
  })
)
