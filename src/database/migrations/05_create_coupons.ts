import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('coupons', (table) => {
    table.increments('id').primary();
    table.string('code', 6).notNullable();
    table.bigInteger('points').notNullable();
    table.decimal('value', 6, 2).notNullable();
    table.boolean('status').notNullable();
    table.dateTime('date', {useTz: false, precision: 6}  ).notNullable();

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