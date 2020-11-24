import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('companyLocations', (table) => {
    table.increments('id').primary();
    table.string('phone', 14);
    table.string('whatsapp', 14);
    table.string('serviceType', 20).notNullable();
    table.string('state', 20).notNullable();
    table.string('city', 20).notNullable();
    table.string('neighborhood', 20).notNullable();
    table.string('street', 60).notNullable();
    table.string('localNumber', 7).notNullable();
    table.string('latitude', 20);
    table.string('longitude', 20);
    table.string('title', 40);

    table.integer('company_id')
    .notNullable()
    .references('id')
    .inTable('companies')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}