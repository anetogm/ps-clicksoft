import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Contact from '#models/contact'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cnpj: string

  @column()
  declare razaoSocial: string

  @column()
  declare nomeFantasia: string | null

  @column()
  declare cep: string

  @column()
  declare logradouro: string

  @column()
  declare numero: string

  @column()
  declare complemento: string | null

  @column()
  declare bairro: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare telefone: string | null

  @column()
  declare email: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>
}
