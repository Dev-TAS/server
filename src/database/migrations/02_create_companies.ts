import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.string('name', 40).notNullable();
    table.string('email', 40);
    table.string('phone', 14);
    table.string('whatsapp', 14);
    table.string('avatar');
    table.string('bio', 144);

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