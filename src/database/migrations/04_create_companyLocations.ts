import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('companyLocations', (table) => {
    table.increments('id').primary();
    table.string('phone');
    table.string('whatsapp');
    table.string('serviceType');
    table.string('state');
    table.string('city');
    table.string('neighborhood');
    table.string('localNumber');
    table.string('latitude');
    table.string('longitude');

    table.integer('company_id')
    .notNullable()
    .references('id')
    .inTable('companies')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');

    table.integer('company_name')
    .notNullable()
    .references('name')
    .inTable('companies')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}