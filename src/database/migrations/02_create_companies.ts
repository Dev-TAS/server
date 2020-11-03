import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email');
    table.string('phone');
    table.string('whatsapp');
    table.string('avatar');
    table.string('bio');

    table.integer('account_id')
    .notNullable()
    .references('id')
    .inTable('companyAccounts')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  })
}

export async function down(knex: Knex) {
  
}