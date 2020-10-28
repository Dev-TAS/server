import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('coupons', (table) => {
    table.increments('id').primary();
    table.string('code').notNullable();
    table.string('points').notNullable();
    table.string('value').notNullable();
    table.string('status').notNullable();
    table.string('date').notNullable();

    table.integer('account_id')
    .notNullable()
    .references('id')
    .inTable('userAccounts')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('coupons');
}