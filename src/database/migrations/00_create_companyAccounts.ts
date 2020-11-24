import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('companyAccounts', (table) => {
    table.increments('id').primary();
    table.string('cpfOrCnpj', 18).notNullable();
    table.string('email', 40).notNullable();
    table.string('password', 20).notNullable();
  })
}

export async function down(knex: Knex) {
  
}