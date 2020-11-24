import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 40).notNullable();
    table.string('email', 40);
    table.string('phone', 14);
    table.string('whatsapp', 14);
    table.string('state', 20);
    table.string('city', 20);
    table.string('avatar');
    table.bigInteger('points').notNullable();

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