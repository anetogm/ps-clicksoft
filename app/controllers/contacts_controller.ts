import type { HttpContext } from '@adonisjs/core/http'
import Contact from '#models/contact'
import Customer from '#models/customer'
import { createContactValidator, updateContactValidator } from '#validators/contact'

export default class ContactsController {
  /**
   * Listar todos os contatos de um cliente
   */
  async index({ params, response }: HttpContext) {
    try {
      const contacts = await Contact.query()
        .where('customer_id', params.customer_id)
        .preload('customer')

      return response.ok(contacts)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao listar contatos', error })
    }
  }

  /**
   * Criar um novo contato
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createContactValidator)

      // Verificar se o cliente existe
      await Customer.findOrFail(payload.customerId)

      const contact = await Contact.create(payload)
      await contact.load('customer')

      return response.created(contact)
    } catch (error) {
      return response.badRequest({ message: 'Erro ao criar contato', error })
    }
  }

  /**
   * Mostrar um contato específico
   */
  async show({ params, response }: HttpContext) {
    try {
      const contact = await Contact.query().where('id', params.id).preload('customer').firstOrFail()

      return response.ok(contact)
    } catch (error) {
      return response.notFound({ message: 'Contato não encontrado' })
    }
  }

  /**
   * Atualizar um contato
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const contact = await Contact.findOrFail(params.id)
      const payload = await request.validateUsing(updateContactValidator)

      contact.merge(payload)
      await contact.save()
      await contact.load('customer')

      return response.ok(contact)
    } catch (error) {
      return response.badRequest({ message: 'Erro ao atualizar contato', error })
    }
  }

  /**
   * Deletar um contato
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const contact = await Contact.findOrFail(params.id)
      await contact.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Contato não encontrado' })
    }
  }
}
