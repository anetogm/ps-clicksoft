import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'
import { createCustomerValidator, updateCustomerValidator } from '#validators/customer'

export default class CustomersController {
  /**
   * Listar todos os clientes
   */
  async index({ response }: HttpContext) {
    try {
      const customers = await Customer.query().preload('contacts')
      return response.ok(customers)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao listar clientes', error })
    }
  }

  /**
   * Criar um novo cliente
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createCustomerValidator)

      // Verificar se CNPJ já existe
      const existingCustomer = await Customer.findBy('cnpj', payload.cnpj)
      if (existingCustomer) {
        return response.conflict({ message: 'CNPJ já cadastrado' })
      }

      const customer = await Customer.create(payload)
      return response.created(customer)
    } catch (error) {
      return response.badRequest({ message: 'Erro ao criar cliente', error })
    }
  }

  /**
   * Mostrar um cliente específico
   */
  async show({ params, response }: HttpContext) {
    try {
      const customer = await Customer.query()
        .where('id', params.id)
        .preload('contacts')
        .firstOrFail()

      return response.ok(customer)
    } catch (error) {
      return response.notFound({ message: 'Cliente não encontrado' })
    }
  }

  /**
   * Atualizar um cliente
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const customer = await Customer.findOrFail(params.id)
      const payload = await request.validateUsing(updateCustomerValidator)

      // Se está atualizando o CNPJ, verificar se já existe
      if (payload.cnpj && payload.cnpj !== customer.cnpj) {
        const existingCustomer = await Customer.findBy('cnpj', payload.cnpj)
        if (existingCustomer) {
          return response.conflict({ message: 'CNPJ já cadastrado' })
        }
      }

      customer.merge(payload)
      await customer.save()

      return response.ok(customer)
    } catch (error) {
      return response.badRequest({ message: 'Erro ao atualizar cliente', error })
    }
  }

  /**
   * Deletar um cliente
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const customer = await Customer.findOrFail(params.id)
      await customer.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Cliente não encontrado' })
    }
  }
}
