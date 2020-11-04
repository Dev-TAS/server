import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email');
    table.string('phone');
    table.string('whatsapp');
    table.string('state');
    table.string('city');
    table.string('avatar');
    table.double('points').notNullable();

    table.integer('account_id')
    .notNullable()
    .references('id')
    .inTable('userAccounts')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  })
}

export async function down(knex: Knex) {
  
}