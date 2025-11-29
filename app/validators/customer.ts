import vine from '@vinejs/vine'

/**
 * Validator para criação de clientes
 */
export const createCustomerValidator = vine.compile(
  vine.object({
    cnpj: vine
      .string()
      .trim()
      .minLength(14)
      .maxLength(14)
      .regex(/^\d{14}$/),
    razaoSocial: vine.string().trim().minLength(1).maxLength(255),
    nomeFantasia: vine.string().trim().minLength(1).maxLength(255).optional(),
    cep: vine
      .string()
      .trim()
      .minLength(8)
      .maxLength(8)
      .regex(/^\d{8}$/),
    logradouro: vine.string().trim().minLength(1).maxLength(255),
    numero: vine.string().trim().minLength(1).maxLength(20),
    complemento: vine.string().trim().maxLength(100).optional(),
    bairro: vine.string().trim().minLength(1).maxLength(100),
    cidade: vine.string().trim().minLength(1).maxLength(100),
    estado: vine.string().trim().minLength(2).maxLength(2).toUpperCase(),
    telefone: vine.string().trim().maxLength(15).optional(),
    email: vine.string().trim().email().maxLength(255).optional(),
  })
)

/**
 * Validator para atualização de clientes
 */
export const updateCustomerValidator = vine.compile(
  vine.object({
    cnpj: vine
      .string()
      .trim()
      .minLength(14)
      .maxLength(14)
      .regex(/^\d{14}$/)
      .optional(),
    razaoSocial: vine.string().trim().minLength(1).maxLength(255).optional(),
    nomeFantasia: vine.string().trim().minLength(1).maxLength(255).optional(),
    cep: vine
      .string()
      .trim()
      .minLength(8)
      .maxLength(8)
      .regex(/^\d{8}$/)
      .optional(),
    logradouro: vine.string().trim().minLength(1).maxLength(255).optional(),
    numero: vine.string().trim().minLength(1).maxLength(20).optional(),
    complemento: vine.string().trim().maxLength(100).optional(),
    bairro: vine.string().trim().minLength(1).maxLength(100).optional(),
    cidade: vine.string().trim().minLength(1).maxLength(100).optional(),
    estado: vine.string().trim().minLength(2).maxLength(2).toUpperCase().optional(),
    telefone: vine.string().trim().maxLength(15).optional(),
    email: vine.string().trim().email().maxLength(255).optional(),
  })
)
