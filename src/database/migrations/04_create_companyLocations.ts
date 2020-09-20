import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('companyLocations', (table) => {
    table.increments('id').primary();
    table.string('phone');
    table.string('whatsapp');
    table.string('serviceType').notNullable();
    table.string('state').notNullable();
    table.string('city').notNullable();
    table.string('neighborhood').notNullable();
    table.string('localNumber').notNullable();
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