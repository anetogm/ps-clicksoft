import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cnpj', 14).notNullable().unique()
      table.string('razao_social', 255).notNullable()
      table.string('nome_fantasia', 255).nullable()
      table.string('cep', 8).notNullable()
      table.string('logradouro', 255).notNullable()
      table.string('numero', 20).notNullable()
      table.string('complemento', 100).nullable()
      table.string('bairro', 100).notNullable()
      table.string('cidade', 100).notNullable()
      table.string('estado', 2).notNullable()
      table.string('telefone', 15).nullable()
      table.string('email', 255).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
